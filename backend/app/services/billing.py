from sqlalchemy.orm import Session

from app.models.subscription import Subscription


def get_subscription(
    db: Session
):

    return db.query(
        Subscription
    ).all()



def create_subscription(
    db: Session,
    plan: str
):

    subscription = Subscription(
        plan=plan
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    return subscription