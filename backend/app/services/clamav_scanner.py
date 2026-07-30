import subprocess


def scan_with_clamav(file_path: str):
    """
    Scan a file using ClamAV.

    Returns:
        - None if the file is clean.
        - A string containing the detected threat if infected.
    """

    try:
        result = subprocess.run(
            ["clamscan", file_path],
            capture_output=True,
            text=True,
            check=False,
        )

        output = result.stdout.strip()

        if "FOUND" in output:
            # Example:
            # uploads/test.exe: Eicar-Test-Signature FOUND
            return output

        return None

    except FileNotFoundError:
        print("Warning: ClamAV is not installed.")
        return None

    except Exception as e:
        print(f"ClamAV error: {e}")
        return None