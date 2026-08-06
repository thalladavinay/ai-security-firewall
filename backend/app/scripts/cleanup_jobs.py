from datetime import datetime, timedelta

from app.core.database import SessionLocal
from app.models.scan_job import ScanJob

db = SessionLocal()

expired = datetime.utcnow() - timedelta(days=7)

db.query(ScanJob).filter(
    ScanJob.created_at < expired
).delete()

db.commit()

db.close()

print("Old jobs deleted.")