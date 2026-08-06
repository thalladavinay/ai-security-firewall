import subprocess


def run_gitleaks(file_path: str):
    """
    Scan a file using Gitleaks.
    """
    try:
        result = subprocess.run(
            [
                "gitleaks",
                "detect",
                "--no-git",
                "--source",
                file_path,
            ],
            capture_output=True,
            text=True,
        )

        return result.stdout

    except Exception:
        return ""