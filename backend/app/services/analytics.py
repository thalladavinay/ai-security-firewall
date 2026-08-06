from sqlalchemy.orm import Session

from app.models.scan import Scan


def get_scan_analytics(
    db: Session
):

    total_scans = db.query(
        Scan
    ).count()


    return {
        "total_scans": total_scans
    }