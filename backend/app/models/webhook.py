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


class Webhook(Base):
    __tablename__ = "webhooks"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=True,
        index=True,
    )

    url = Column(
        String,
        nullable=False,
    )

    event = Column(
        String,
        nullable=False,
    )

    secret = Column(
        String,
        nullable=True,
    )

    active = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    last_delivery = Column(
        DateTime,
        nullable=True,
    )

    failure_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    organization = relationship(
        "Organization",
        backref="webhooks",
    )