from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base


class PasswordReset(Base):
    __tablename__ = "password_resets"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, index=True)

    otp = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )