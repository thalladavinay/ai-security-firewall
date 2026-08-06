from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.webhook import Webhook

router = APIRouter(
    prefix="/webhooks",
    tags=["Webhooks"]
)


@router.get("/")
def get_webhooks(
    db: Session = Depends(get_db)
):

    return db.query(Webhook).all()


@router.post("/")
def create_webhook(
    url: str,
    event: str,
    db: Session = Depends(get_db)
):

    webhook = Webhook(
        url=url,
        event=event
    )

    db.add(webhook)
    db.commit()
    db.refresh(webhook)

    return webhook