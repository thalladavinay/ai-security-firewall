from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.core.database import Base


class EmailVerification(Base):
    __tablename__ = "email_verifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    email = Column(
        String,
        nullable=False,
        index=True,
    )

    token = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )