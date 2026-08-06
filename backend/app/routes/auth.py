import secrets
from urllib import request

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
)

from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db
from app.core.limiter import limiter
from app.core.dependencies import get_current_user
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)

from app.models.user import User
from app.models.email_verification import EmailVerification

from app.schemas.auth import Token
from app.schemas.user import (
    UserLogin,
    UserRegister,
    UserResponse,
)

from app.services.audit_logger import create_audit_log
from app.services.notification_service import create_notification
from app.services.email_service import send_verification_email

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


class ChangePassword(BaseModel):
    current_password: str
    new_password: str


# ==================================================
# Register
# ==================================================

@router.post("/register")
async def register_user(
    user: UserRegister,
    db: Session = Depends(get_db),
):
    existing_email = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    existing_username = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists.",
        )

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
        email_verified=False,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # ----------------------------------------
    # Generate verification token
    # ----------------------------------------

    token = secrets.token_urlsafe(32)

    verification = EmailVerification(
        email=new_user.email,
        token=token,
    )

    db.add(verification)
    db.commit()

    # ----------------------------------------
    # Build verification link
    # ----------------------------------------

    verification_link = (
    f"{FRONTEND_URL}/verify?token={token}"
)

    # ----------------------------------------
    # Send verification email
    # ----------------------------------------

    try:
        await send_verification_email(
            new_user.email,
            verification_link,
        )
    except Exception as e:
        print("Email sending failed:", e)

        raise HTTPException(
            status_code=500,
            detail="Unable to send verification email.",
        )

    return {
        "message": "Registration successful. Please verify your email.",
        "user": UserResponse.model_validate(new_user),
    }


# ==================================================
# Verify Email
# ==================================================

@router.get("/verify-email")
def verify_email(
    token: str,
    db: Session = Depends(get_db),
):
    verification = (
        db.query(EmailVerification)
        .filter(EmailVerification.token == token)
        .first()
    )

    if verification is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid verification token.",
        )

    user = (
        db.query(User)
        .filter(User.email == verification.email)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    user.email_verified = True

    db.add(user)
    db.delete(verification)

    db.commit()

    return {
        "message": "Email verified successfully."
    }


# ==================================================
# Login
# ==================================================

@router.post(
    "/login",
    response_model=Token,
)
@limiter.limit("5/minute")
def login_user(
    request: Request,
    user: UserLogin,
    db: Session = Depends(get_db),
):
    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    if not verify_password(
        user.password,
        db_user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    if not db_user.email_verified:
        raise HTTPException(
            status_code=400,
            detail="Please verify your email first.",
        )

    access_token = create_access_token(
        {
            "sub": db_user.email,
            "id": db_user.id,
        }
    )

    create_audit_log(
        db=db,
        user_email=db_user.email,
        action="LOGIN",
        ip_address=request.client.host,
    )

    return Token(
        access_token=access_token,
        token_type="bearer",
    )


# ==================================================
# Profile
# ==================================================

@router.get("/me")
def get_profile(
    current_user=Depends(get_current_user),
):
    return current_user

# ==================================================
# Change Password
# ==================================================

@router.post("/change-password")
def change_password(
    data: ChangePassword,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user = (
        db.query(User)
        .filter(User.id == current_user["id"])
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    if not verify_password(
        data.current_password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect.",
        )

    user.hashed_password = hash_password(
        data.new_password,
    )

    db.commit()

    # ----------------------------------------
    # Audit Log
    # ----------------------------------------
    create_audit_log(
        db=db,
        user_email=user.email,
        action="PASSWORD CHANGE",
        ip_address=request.client.host,
    )

    # ----------------------------------------
    # Notification
    # ----------------------------------------
    create_notification(
        db=db,
        user_id=current_user["id"],
        message="Password changed successfully.",
    )

    return {
        "message": "Password changed successfully."
    }