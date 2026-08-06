from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.activity_log import ActivityLog

router = APIRouter(
    prefix="/activity",
    tags=["Activity"]
)


@router.get("/")
def get_activity(
    db: Session = Depends(get_db)
):

    return db.query(ActivityLog).all()