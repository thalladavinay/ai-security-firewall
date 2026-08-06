import pytesseract
from PIL import Image


def extract_text(file_path: str) -> str:
    """
    Extract text from an image using OCR.
    """
    try:
        image = Image.open(file_path)
        return pytesseract.image_to_string(image)

    except Exception:
        return ""