from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.database import get_db
from app.models.scan_result import Scan

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get("/")
def get_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Return the complete scan history ordered by newest first.
    """

    scans = (
        db.query(Scan)
        .filter(Scan.user_id == current_user["id"])
        .order_by(Scan.id.desc())
        .all()
    )

    return scans