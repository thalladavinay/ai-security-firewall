from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.subscription import Subscription

router = APIRouter(
    prefix="/billing",
    tags=["Billing"]
)


@router.get("/")
def get_subscription(
    db: Session = Depends(get_db)
):

    return db.query(Subscription).all()


@router.post("/")
def create_subscription(
    plan: str,
    db: Session = Depends(get_db)
):

    subscription = Subscription(
        plan=plan
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    return subscription