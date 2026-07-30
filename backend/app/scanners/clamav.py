import subprocess

def scan_file(file_path: str):
    result = subprocess.run(
        ["clamscan", file_path],
        capture_output=True,
        text=True,
    )

    output = result.stdout

    if "OK" in output:
        return {
            "status": "Safe",
            "risk_score": 0,
            "message": "No malware detected."
        }

    if "FOUND" in output:
        return {
            "status": "Malicious",
            "risk_score": 100,
            "message": "Malware detected!"
        }

    return {
        "status": "Unknown",
        "risk_score": 50,
        "message": output
    }