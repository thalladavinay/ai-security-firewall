from typing import Dict


def generate_ai_explanation(scan: Dict) -> Dict:
    """
    Generate a human-readable security explanation.
    """

    risk = scan.get("risk_score", 0)

    malware = scan.get("malware_detected", False)

    yara = scan.get("yara_matches", [])

    vt = scan.get("virustotal", {})

    reasons = []

    recommendations = []

    # Threat level
    if risk >= 80:
        threat = "HIGH"
    elif risk >= 50:
        threat = "MEDIUM"
    else:
        threat = "LOW"

    # Malware
    if malware:
        reasons.append(
            "ClamAV detected malware."
        )

    # YARA
    if yara:
        for rule in yara:
            reasons.append(
                f"YARA rule matched: {rule}"
            )

    # VirusTotal
    if vt.get("malicious", 0) > 0:
        reasons.append(
            f"VirusTotal detected the file as malicious ({vt['malicious']} engines)."
        )

    # Risk score
    reasons.append(
        f"Overall Risk Score: {risk}/100"
    )

    # Recommendations
    if threat == "HIGH":
        recommendations.extend([
            "Delete the file immediately.",
            "Perform a full antivirus scan.",
            "Do not execute or open the file.",
        ])

    elif threat == "MEDIUM":
        recommendations.extend([
            "Open the file only inside a sandbox.",
            "Verify the source before using it.",
            "Monitor the system for suspicious activity.",
        ])

    else:
        recommendations.extend([
            "The file appears safe.",
            "Keep antivirus definitions updated.",
        ])

    return {
        "threat_level": threat,
        "reason": reasons,
        "recommendation": recommendations,
    }