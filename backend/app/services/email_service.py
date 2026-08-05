from fastapi_mail import (
    FastMail,
    MessageSchema,
    MessageType,
)

from app.core.email import conf


async def send_otp_email(
    email: str,
    otp: str,
):
    message = MessageSchema(
        subject="AI Security Firewall - Password Reset OTP",
        recipients=[email],
        body=f"""
Hello,

Your OTP is:

{otp}

This OTP expires in 10 minutes.

Regards,
AI Security Firewall
""",
        subtype=MessageType.plain,
    )

    try:
        fm = FastMail(conf)
        await fm.send_message(message)
        print("✅ Password reset email sent.")

    except Exception as e:
        print("❌ Password reset email failed:", e)
        raise


async def send_verification_email(
    email: str,
    verification_link: str,
):
    message = MessageSchema(
        subject="Verify Your AI Security Firewall Account",
        recipients=[email],
        body=f"""
Hello,

Thank you for registering.

Please verify your email by clicking the link below:

{verification_link}

If you didn't create this account, you can ignore this email.

Regards,
AI Security Firewall
""",
        subtype=MessageType.plain,
    )

    try:
        fm = FastMail(conf)
        await fm.send_message(message)
        print(f"✅ Verification email sent to {email}")

    except Exception as e:
        print("❌ Verification email failed:", e)
        raise