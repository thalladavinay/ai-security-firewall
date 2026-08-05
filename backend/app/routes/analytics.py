from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.scan_result import Scan

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/risk-trend")
def risk_trend(
    db: Session = Depends(get_db),
):
    scans = db.query(Scan).all()

    today = datetime.utcnow().date()

    daily = 0
    weekly = 0
    monthly = 0

    for scan in scans:

        created = (
            scan.created_at.date()
            if hasattr(scan, "created_at")
            else today
        )

        if created == today:
            daily += 1

        if created >= today - timedelta(days=7):
            weekly += 1

        if created >= today - timedelta(days=30):
            monthly += 1

    return {
        "daily": daily,
        "weekly": weekly,
        "monthly": monthly,
    }