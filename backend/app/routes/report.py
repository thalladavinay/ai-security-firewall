from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)

REPORTS_DIR = Path("reports")


@router.get("/{filename}")
def download_report(filename: str):
    """
    Download a generated PDF report.
    """

    # Prevent directory traversal attacks
    safe_filename = Path(filename).name
    report_path = REPORTS_DIR / safe_filename

    if not report_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Report not found.",
        )

    return FileResponse(
        path=str(report_path),
        media_type="application/pdf",
        filename=safe_filename,
    )