from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func

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
        nullable=False,
    )

    action = Column(
        String,
        nullable=False,
    )

    ip_address = Column(
        String,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )