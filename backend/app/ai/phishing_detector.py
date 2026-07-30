PHISHING_KEYWORDS = [
    "verify your account",
    "click here",
    "urgent",
    "bank account",
    "login immediately",
    "reset password",
    "otp",
    "credit card",
    "payment failed",
]


def detect_phishing(text: str):
    """
    Detect common phishing phrases.
    """

    text = text.lower()

    detected = []

    for keyword in PHISHING_KEYWORDS:
        if keyword in text:
            detected.append(keyword)

    return {
        "detected": len(detected) > 0,
        "keywords": detected,
    }