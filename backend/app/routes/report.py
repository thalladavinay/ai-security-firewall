from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
)

from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.services.audit_logger import create_audit_log
from app.services.notification_service import create_notification

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)

REPORTS_DIR = Path("reports")


@router.get("/{filename}")
def download_report(
    filename: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    safe_filename = Path(filename).name

    report_path = REPORTS_DIR / safe_filename

    if not report_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Report not found.",
        )

    # ----------------------------------------
    # Audit Log
    # ----------------------------------------
    create_audit_log(
        db=db,
        user_email=current_user["email"],
        action="REPORT DOWNLOAD",
        ip_address=request.client.host,
    )

    # ----------------------------------------
    # Notification
    # ----------------------------------------
    create_notification(
        db=db,
        user_id=current_user["id"],
        message="Report downloaded.",
    )

    return FileResponse(
        path=str(report_path),
        media_type="application/pdf",
        filename=safe_filename,
    )