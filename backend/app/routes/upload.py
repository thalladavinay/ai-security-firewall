import os
import shutil
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    Request,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.limiter import limiter

from app.models.scan_result import Scan

from app.services.ai_explainer import generate_ai_explanation
from app.services.audit_logger import create_audit_log
from app.services.pdf_report import generate_pdf_report
from app.services.scanner import scan_file
from app.services.virustotal import check_file

from app.utils.file_hash import get_file_hash

router = APIRouter(tags=["Upload"])

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
@limiter.limit("10/minute")
async def upload_file(
    request: Request,
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
    file_path = os.path.join(UPLOAD_DIR, filename)

    try:
        # Save uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Calculate SHA-256 hash
        file_hash = get_file_hash(file_path)

        # Check duplicate scan
        existing_scan = (
            db.query(Scan)
            .filter(Scan.file_hash == file_hash)
            .first()
        )

        if existing_scan:
            return {
                "duplicate": True,
                "message": "File already scanned.",
                "filename": existing_scan.filename,
                "risk_score": existing_scan.risk_score,
                "report": (
                    os.path.basename(existing_scan.report_path)
                    if existing_scan.report_path
                    else None
                ),
            }

        # Scan file
        scan_result = scan_file(file_path)

        # VirusTotal
        vt_result = check_file(file_path)

        # Convert to dictionary
        scan_data = scan_result.model_dump()
        scan_data["virustotal"] = vt_result

        # AI Explanation
        ai_explanation = generate_ai_explanation(scan_data)

        # Generate PDF
        pdf_path = generate_pdf_report(
            filename,
            scan_data,
        )

        # Save to database
        scan = Scan(
            filename=filename,
            status=scan_result.status,
            risk_score=scan_result.risk_score,
            file_hash=file_hash,
            report_path=pdf_path,
            user_id=current_user["id"],
        )

        db.add(scan)
        db.commit()
        db.refresh(scan)

        # Audit log
        create_audit_log(
            db=db,
            user_email=current_user["sub"],
            action="UPLOAD",
            ip_address=request.client.host,
        )

        return {
            "filename": filename,
            "status": "uploaded",
            "scan": scan_data,
            "virustotal": vt_result,
            "ai_explanation": ai_explanation,
            "report": (
                os.path.basename(pdf_path)
                if pdf_path
                else None
            ),
        }

    except Exception as e:
        db.rollback()

        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception:
                pass

        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}",
        )