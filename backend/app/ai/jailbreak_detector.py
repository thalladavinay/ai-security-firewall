JAILBREAK_PATTERNS = [
    "dan",
    "do anything now",
    "developer mode",
    "evil mode",
    "unfiltered",
    "ignore openai policy",
]


def detect_jailbreak(text: str):
    """
    Detect common jailbreak prompts.
    """

    text = text.lower()

    detected = []

    for pattern in JAILBREAK_PATTERNS:
        if pattern in text:
            detected.append(pattern)

    return {
        "detected": len(detected) > 0,
        "patterns": detected,
    }