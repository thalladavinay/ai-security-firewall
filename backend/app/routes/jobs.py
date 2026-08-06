from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.scan_job import ScanJob

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.get("/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(ScanJob).filter(
        ScanJob.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found."
        )

    return job