import subprocess


def run_bandit(file_path: str):
    """
    Scan Python files using Bandit.
    """
    try:
        result = subprocess.run(
            [
                "bandit",
                "-r",
                file_path,
            ],
            capture_output=True,
            text=True,
        )

        return result.stdout

    except Exception:
        return ""