from fastapi_mail import FastMail, MessageSchema, MessageType

from app.core.email import conf


async def send_otp_email(email: str, otp: str):

    message = MessageSchema(
        subject="AI Security Firewall Password Reset",
        recipients=[email],
        body=f"""
Your One-Time Password (OTP) is:

{otp}

This OTP is valid for 10 minutes.

If you did not request a password reset, please ignore this email.
""",
        subtype=MessageType.plain,
    )

    fm = FastMail(conf)

    await fm.send_message(message)