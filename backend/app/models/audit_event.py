from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime

from app.core.database import Base


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    event_type = Column(
        String,
        nullable=False
    )

    user_id = Column(
        Integer,
        nullable=True
    )

    details = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )