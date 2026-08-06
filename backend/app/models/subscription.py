from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.core.database import Base


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    plan = Column(
        String,
        default="free"
    )

    status = Column(
        String,
        default="active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )