from sqlalchemy import Column, Integer, String, Boolean

from app.core.database import Base


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    provider = Column(
        String,
        nullable=False
    )

    enabled = Column(
        Boolean,
        default=True
    )