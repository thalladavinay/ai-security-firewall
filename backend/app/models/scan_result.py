from sqlalchemy import Column, ForeignKey, Integer, String
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
    )

    risk_score = Column(
        Integer,
        nullable=False,
        default=0,
    )

    # SHA-256 hash of the uploaded file
    file_hash = Column(
        String,
        unique=True,
        nullable=False,
    )

    # Path to the generated PDF report
    report_path = Column(
        String,
        nullable=True,
        default=None,
    )

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