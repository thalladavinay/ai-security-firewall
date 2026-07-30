from datetime import datetime, timedelta

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import hash_password
from app.models.password_reset import PasswordReset
from app.models.user import User
from app.services.email_service import send_otp_email
from app.utils.otp import generate_otp

router = APIRouter(
    prefix="/forgot-password",
    tags=["Forgot Password"],
)


@router.post("/")
async def forgot_password(
    email: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    otp = generate_otp()

    record = (
        db.query(PasswordReset)
        .filter(PasswordReset.email == email)
        .first()
    )

    if record:
        record.otp = otp
        record.created_at = datetime.utcnow()
    else:
        record = PasswordReset(
            email=email,
            otp=otp,
            created_at=datetime.utcnow(),
        )
        db.add(record)

    db.commit()

    background_tasks.add_task(
        send_otp_email,
        email,
        otp,
    )

    return {
        "message": "OTP sent to your email."
    }


@router.post("/verify")
def verify_otp(
    email: str,
    otp: str,
    db: Session = Depends(get_db),
):
    record = (
        db.query(PasswordReset)
        .filter(
            PasswordReset.email == email,
            PasswordReset.otp == otp,
        )
        .first()
    )

    if record is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP."
        )

    if datetime.utcnow() - record.created_at > timedelta(minutes=10):
        db.delete(record)
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="OTP has expired."
        )

    return {
        "message": "OTP verified successfully."
    }


@router.post("/reset")
def reset_password(
    email: str,
    otp: str,
    new_password: str,
    db: Session = Depends(get_db),
):
    record = (
        db.query(PasswordReset)
        .filter(
            PasswordReset.email == email,
            PasswordReset.otp == otp,
        )
        .first()
    )

    if record is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP."
        )

    if datetime.utcnow() - record.created_at > timedelta(minutes=10):
        db.delete(record)
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="OTP has expired."
        )

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Password strength validation
    if len(new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 8 characters."
        )

    user.hashed_password = hash_password(new_password)

    db.delete(record)

    db.commit()

    return {
        "message": "Password reset successful."
    }