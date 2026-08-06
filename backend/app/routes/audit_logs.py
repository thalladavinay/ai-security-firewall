from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.admin import get_admin
from app.core.database import get_db
from app.models.audit_log import AuditLog

router = APIRouter(
    prefix="/audit-logs",
    tags=["Audit Logs"],
)


@router.get("/")
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_admin),
):
    logs = (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .all()
    )

    return logs