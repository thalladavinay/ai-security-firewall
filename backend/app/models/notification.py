from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from app.core.database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
    )

    message = Column(
        String,
    )

    is_read = Column(
        Boolean,
        default=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
    )