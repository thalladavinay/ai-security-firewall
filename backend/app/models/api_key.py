from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import relationship

from app.core.database import Base


class APIKey(Base):
    __tablename__ = "api_keys"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    key = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
        index=True,
    )

    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    expires_at = Column(
        DateTime,
        nullable=True,
    )

    last_used = Column(
        DateTime,
        nullable=True,
    )

    usage_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    organization = relationship(
        "Organization",
        backref="api_keys",
    )

    user = relationship(
        "User",
        backref="api_keys",
    )