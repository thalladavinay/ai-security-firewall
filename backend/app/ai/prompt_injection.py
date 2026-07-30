SUSPICIOUS_PATTERNS = [
    "ignore previous instructions",
    "forget your instructions",
    "system prompt",
    "developer mode",
    "jailbreak",
    "bypass",
    "disable safety",
    "pretend you are",
    "act as root",
    "sudo",
]


def detect_prompt_injection(text: str):
    """
    Detect common prompt injection attempts.

    Returns a dictionary describing whether any suspicious
    patterns were found.
    """

    text = text.lower()

    detected = []

    for pattern in SUSPICIOUS_PATTERNS:
        if pattern in text:
            detected.append(pattern)

    return {
        "detected": len(detected) > 0,
        "patterns": detected,
    }