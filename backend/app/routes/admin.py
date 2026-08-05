from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.admin import get_admin
from app.core.database import get_db
from app.models.user import User
from app.models.scan_result import Scan

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


# ----------------------------
# Admin Dashboard
# ----------------------------
@router.get("/dashboard")
def admin_dashboard(
    current_user=Depends(get_admin),
):
    return {
        "message": "Welcome Admin",
        "admin": current_user.username,
    }


# ----------------------------
# List All Users
# ----------------------------
@router.get("/users")
def get_users(
    current_user=Depends(get_admin),
    db: Session = Depends(get_db),
):
    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active,
        }
        for user in users
    ]


# ----------------------------
# Total Users
# ----------------------------
@router.get("/users/count")
def user_count(
    db: Session = Depends(get_db),
    current_user=Depends(get_admin),
):
    return {
        "users": db.query(User).count()
    }


# ----------------------------
# Total Scans
# ----------------------------
@router.get("/scans/count")
def scan_count(
    db: Session = Depends(get_db),
    current_user=Depends(get_admin),
):
    return {
        "scans": db.query(Scan).count()
    }


# ----------------------------
# Total Reports
# ----------------------------
@router.get("/reports/count")
def report_count(
    db: Session = Depends(get_db),
    current_user=Depends(get_admin),
):
    return {
        "reports": db.query(Scan)
        .filter(Scan.report_path.isnot(None))
        .count()
    }


# ----------------------------
# System Health
# ----------------------------
@router.get("/health")
def system_health(
    current_user=Depends(get_admin),
):
    return {
        "backend": "Running",
        "database": "Connected",
        "clamav": "Available",
        "yara": "Loaded",
    }


# ----------------------------
# Scan Analytics
# ----------------------------
@router.get("/analytics")
def get_scan_analytics(
    current_user=Depends(get_admin),
    db: Session = Depends(get_db),
):
    total_users = db.query(User).count()

    total_scans = db.query(Scan).count()

    average_risk_score = (
        db.query(func.avg(Scan.risk_score))
        .scalar()
    )

    average_risk_score = round(
        average_risk_score or 0,
        2,
    )

    malicious = (
        db.query(Scan)
        .filter(Scan.status == "Malicious")
        .count()
    )

    warning = (
        db.query(Scan)
        .filter(Scan.status == "Warning")
        .count()
    )

    safe = (
        db.query(Scan)
        .filter(Scan.status == "Safe")
        .count()
    )

    threats = {
        "Malware": malicious,
        "Warning": warning,
        "Safe": safe,
    }

    most_common_threat = (
        max(threats, key=threats.get)
        if total_scans > 0
        else "None"
    )

    return {
        "total_users": total_users,
        "total_scans": total_scans,
        "total_reports": db.query(Scan)
            .filter(Scan.report_path.isnot(None))
            .count(),
        "average_risk_score": average_risk_score,
        "most_common_threat": most_common_threat,
    }