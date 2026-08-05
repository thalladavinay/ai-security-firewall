import hashlib
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

# Load .env
load_dotenv(Path(__file__).resolve().parents[2] / ".env")

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

print("=" * 60)
print("VirusTotal API Key:", API_KEY)
print("=" * 60)


def check_file(file_path: str):
    """
    Check a file hash against VirusTotal.
    """

    if not API_KEY:
        return {
            "found": False,
            "error": "VirusTotal API key not configured."
        }

    sha256 = hashlib.sha256()

    with open(file_path, "rb") as f:
        while chunk := f.read(8192):
            sha256.update(chunk)

    file_hash = sha256.hexdigest()

    headers = {
        "x-apikey": API_KEY
    }

    url = f"https://www.virustotal.com/api/v3/files/{file_hash}"

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()

        stats = data["data"]["attributes"]["last_analysis_stats"]

        return {
            "found": True,
            "sha256": file_hash,
            "malicious": stats["malicious"],
            "suspicious": stats["suspicious"],
            "harmless": stats["harmless"],
            "undetected": stats["undetected"],
        }

    elif response.status_code == 404:
        return {
            "found": False,
            "sha256": file_hash,
            "message": "File hash not found in VirusTotal."
        }

    return {
        "found": False,
        "error": response.text
    }