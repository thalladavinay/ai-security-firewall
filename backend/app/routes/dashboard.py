from app.core.auth import get_current_user
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.scan_result import Scan
from app.core.auth import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Return dashboard statistics.
    """

    total_scans = (
    db.query(Scan)
    .filter(Scan.user_id == current_user["id"])
    .count()
)
    safe_files = (
    db.query(Scan)
    .filter(
        Scan.user_id == current_user["id"],
        func.lower(Scan.status) == "safe"
    )
    .count()
)
    warning_files = (
        db.query(Scan)
        .filter(
            Scan.user_id == current_user["id"],
            func.lower(Scan.status) == "warning"
        )
        .count()
    )

    malicious_files = (
        db.query(Scan)
        .filter(
           Scan.user_id == current_user["id"],
            func.lower(Scan.status) == "malicious"
        )
        .count()
    )

    average_risk_score = (
    db.query(func.avg(Scan.risk_score))
    .filter(Scan.user_id == current_user["id"])
    .scalar()
)
    danger_files = db.query(Scan).filter(
   Scan.user_id == current_user["id"],
    Scan.status == "danger"
).count()

    return {
        "total_scans": total_scans,
        "safe_files": safe_files,
        "warning_files": warning_files,
        "malicious_files": malicious_files,
        "danger_files": danger_files,
        "average_risk_score": round(float(average_risk_score or 0), 2),
    }


@router.get("/recent")
def get_recent_scans(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Return the five most recent scans.
    """

    scans = (
    db.query(Scan)
    .filter(Scan.user_id == current_user["id"])
    .order_by(Scan.id.desc())
    .limit(5)
    .all()
)

    return scans