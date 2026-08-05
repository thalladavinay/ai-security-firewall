from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    username = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    hashed_password = Column(
        String,
        nullable=False,
    )

    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    # Role-Based Access Control (RBAC)
    is_admin = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    # Email Verification
    email_verified = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    scans = relationship(
        "Scan",
        back_populates="user",
        cascade="all, delete-orphan",
    )