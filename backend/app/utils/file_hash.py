import hashlib


def get_file_hash(file_path: str) -> str:
    """
    Generate SHA-256 hash for a file.
    """

    sha = hashlib.sha256()

    with open(file_path, "rb") as f:
        while chunk := f.read(8192):
            sha.update(chunk)

    return sha.hexdigest()