from pydantic import BaseModel
from typing import List


class ScanResult(BaseModel):
    status: str
    risk_score: int
    threats: List[str]
    message: str


class ScanResponse(BaseModel):
    id: int
    filename: str
    status: str
    risk_score: int
    file_hash: str
    report_path: str | None = None
    user_id: int | None = None

    class Config:
        from_attributes = True