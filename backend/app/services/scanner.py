import os

from app.schemas.scan_result import ScanResult
from app.services.clamav_scanner import scan_with_clamav
from app.services.yara_scanner import scan_with_yara


def scan_file(file_path: str) -> ScanResult:
    """
    Scan a file using ClamAV and YARA.
    """

    if not os.path.exists(file_path):
        return ScanResult(
            status="Error",
            risk_score=100,
            threats=["File not found"],
            message="The uploaded file could not be located.",
        )

    file_size = os.path.getsize(file_path)

    if file_size == 0:
        return ScanResult(
            status="Warning",
            risk_score=10,
            threats=["Empty file"],
            message="Uploaded file is empty.",
        )

    threats = []
    risk_score = 0

    try:
        # ClamAV scan
        clamav_result = scan_with_clamav(file_path)

        if clamav_result:
            threats.append(clamav_result)
            risk_score += 70

        # YARA scan
        yara_results = scan_with_yara(file_path)

        if yara_results:
            threats.extend(yara_results)
            risk_score += 30

    except Exception as e:
        return ScanResult(
            status="Error",
            risk_score=100,
            threats=[str(e)],
            message="Scanning failed.",
        )

    if threats:
        return ScanResult(
            status="Malicious",
            risk_score=min(risk_score, 100),
            threats=threats,
            message="Threats detected.",
        )

    return ScanResult(
        status="Safe",
        risk_score=0,
        threats=[],
        message="No threats detected.",
    )