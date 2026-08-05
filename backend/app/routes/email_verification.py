from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.email_verification import EmailVerification
from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Email Verification"],
)


@router.get("/verify-email")
def verify_email(
    token: str,
    db: Session = Depends(get_db),
):
    # Find verification token
    verification = (
        db.query(EmailVerification)
        .filter(EmailVerification.token == token)
        .first()
    )

    if verification is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired verification token.",
        )

    # Find user
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

    # Verify email
    user.email_verified = True

    # Delete token
    db.delete(verification)

    db.commit()

    return {
        "message": "Email verified successfully."
    }