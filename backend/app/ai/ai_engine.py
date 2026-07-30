from app.ai.prompt_injection import detect_prompt_injection
from app.ai.jailbreak_detector import detect_jailbreak
from app.ai.phishing_detector import detect_phishing


def analyze_text(text: str):
    """
    Run all AI security checks on the supplied text.
    """

    prompt_result = detect_prompt_injection(text)
    jailbreak_result = detect_jailbreak(text)
    phishing_result = detect_phishing(text)

    threats = []

    if prompt_result["detected"]:
        threats.extend(prompt_result["patterns"])

    if jailbreak_result["detected"]:
        threats.extend(jailbreak_result["patterns"])

    if phishing_result["detected"]:
        threats.extend(phishing_result["keywords"])

    risk_score = min(len(threats) * 20, 100)

    return {
        "risk_score": risk_score,
        "threats": threats,
        "prompt_injection": prompt_result,
        "jailbreak": jailbreak_result,
        "phishing": phishing_result,
    }