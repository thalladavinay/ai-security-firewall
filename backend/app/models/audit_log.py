from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    Text,
)

from app.core.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_email = Column(
        String,
        nullable=True,
        index=True,
    )

    action = Column(
        String,
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    ip_address = Column(
        String,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )