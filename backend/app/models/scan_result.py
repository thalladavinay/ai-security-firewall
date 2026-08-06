from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.core.database import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    filename = Column(
        String,
        nullable=False,
        index=True,
    )

    status = Column(
        String,
        nullable=False,
        default="Pending",
        index=True,
    )

    risk_score = Column(
        Integer,
        nullable=False,
        default=0,
        index=True,
    )

    file_hash = Column(
        String,
        nullable=False,
        index=True,
    )

    report_path = Column(
        String,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    # =====================================
    # User Relationship
    # =====================================

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
        index=True,
    )

    user = relationship(
        "User",
        back_populates="scans",
    )