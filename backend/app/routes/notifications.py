from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.notification import Notification

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get("/")
def get_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == current_user["id"])
        .order_by(Notification.id.desc())
        .all()
    )

    return [
        {
            "id": notification.id,
            "message": notification.message,
            "is_read": notification.is_read,
        }
        for notification in notifications
    ]