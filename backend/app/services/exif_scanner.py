from PIL import Image


def extract_metadata(file_path: str):
    """
    Extract EXIF metadata.
    """
    try:
        image = Image.open(file_path)
        return image.getexif()

    except Exception:
        return {}