from sqlalchemy import Column, Integer, String, ForeignKey
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
    )

    status = Column(
        String,
        nullable=False,
    )

    risk_score = Column(
        Integer,
        nullable=False,
    )

    report_path = Column(
        String,
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
    )

    user = relationship(
        "User",
        back_populates="scans",
    )