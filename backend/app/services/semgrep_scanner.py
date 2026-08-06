import subprocess


def run_semgrep(file_path: str):
    """
    Scan source code using Semgrep.
    """
    try:
        result = subprocess.run(
            [
                "semgrep",
                "--config=auto",
                file_path,
            ],
            capture_output=True,
            text=True,
        )

        return result.stdout

    except Exception:
        return ""