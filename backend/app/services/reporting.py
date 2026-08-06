from datetime import datetime


def generate_report_summary(data: dict):

    return {
        "generated_at": datetime.utcnow(),
        "summary": data
    }