from pathlib import Path

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate


REPORTS_DIR = Path("reports")
REPORTS_DIR.mkdir(exist_ok=True)


def generate_pdf_report(
    filename: str,
    scan_result: dict,
) -> str:
    """
    Generate a PDF report for a completed scan.
    """

    report_name = f"{Path(filename).stem}_report.pdf"
    pdf_path = REPORTS_DIR / report_name

    doc = SimpleDocTemplate(str(pdf_path))
    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "AI Security Firewall Report",
            styles["Title"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Filename:</b> {filename}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Status:</b> {scan_result.get('status', 'Unknown')}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Risk Score:</b> {scan_result.get('risk_score', 0)}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Message:</b> {scan_result.get('message', '')}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            "<b>Threats</b>",
            styles["Heading2"],
        )
    )

    threats = scan_result.get("threats", [])

    if threats:
        for threat in threats:
            story.append(
                Paragraph(
                    f"• {threat}",
                    styles["BodyText"],
                )
            )
    else:
        story.append(
            Paragraph(
                "No threats detected.",
                styles["BodyText"],
            )
        )

    doc.build(story)

    return str(pdf_path)