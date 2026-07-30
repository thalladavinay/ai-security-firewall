from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.scan_result import Scan
from app.services.pdf_report import generate_pdf_report
from app.services.scanner import scan_file
from app.core.auth import get_current_user

import os
import shutil
from pathlib import Path

router = APIRouter(
    tags=["Upload"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".txt",
    ".docx",
    ".png",
    ".jpg",
    ".jpeg",
    ".py",
    ".js",
    ".java",
    ".cpp",
    ".c",
}


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected.",
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type.",
        )

    filename = os.path.basename(file.filename)
    file_path = os.path.join(
        UPLOAD_DIR,
        filename,
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    scan_result = scan_file(file_path)

    pdf_path = generate_pdf_report(
        filename,
        scan_result.model_dump(),
    )

    scan = Scan(
        filename=filename,
        status=scan_result.status,
        risk_score=scan_result.risk_score,
        report_path=pdf_path,
        user_id=current_user["id"],
    )

    db.add(scan)
    db.commit()
    db.refresh(scan)

    return {
        "filename": filename,
        "status": "uploaded",
        "scan": scan_result.model_dump(),
        "report": os.path.basename(pdf_path),
    }