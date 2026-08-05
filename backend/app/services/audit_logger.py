from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def create_audit_log(
    db: Session,
    user_email: str,
    action: str,
    ip_address: str,
):
    log = AuditLog(
        user_email=user_email,
        action=action,
        ip_address=ip_address,
    )

    db.add(log)
    db.commit()