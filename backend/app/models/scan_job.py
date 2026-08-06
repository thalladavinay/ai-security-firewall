from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base


class ScanJob(Base):
    __tablename__ = "scan_jobs"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String)

    status = Column(String, default="queued")

    created_at = Column(DateTime, default=datetime.utcnow)