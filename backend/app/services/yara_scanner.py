from pathlib import Path
import yara

# Project root (backend/)
BASE_DIR = Path(__file__).resolve().parents[2]

# Path to YARA rules
RULE_FILE = BASE_DIR / "yara_rules" / "basic_rules.yar"


def scan_with_yara(file_path: str):
    """
    Scan a file using YARA.

    Returns:
        - [] if no rules match.
        - List of matched rule names.
    """

    try:
        if not RULE_FILE.exists():
            print(f"Warning: YARA rule file not found: {RULE_FILE}")
            return []

        rules = yara.compile(filepath=str(RULE_FILE))

        matches = rules.match(file_path)

        return [match.rule for match in matches]

    except Exception as e:
        print(f"YARA scan error: {e}")
        return []