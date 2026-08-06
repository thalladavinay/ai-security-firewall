from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.notification import Notification

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/")
def get_notifications(
    db: Session = Depends(get_db)
):
    return db.query(Notification).all()


@router.post("/")
def create_notification(
    title: str,
    message: str,
    db: Session = Depends(get_db)
):

    notification = Notification(
        title=title,
        message=message
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification