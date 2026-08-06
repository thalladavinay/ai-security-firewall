import os

from dotenv import load_dotenv

load_dotenv()

PROJECT_NAME = "AI Security Firewall"

VERSION = "1.0.0"

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///security_firewall.db",
)

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv(
    "ALGORITHM",
    "HS256",
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        60,
    )
)

UPLOAD_DIR = os.getenv(
    "UPLOAD_DIR",
    "uploads",
)

REPORT_DIR = os.getenv(
    "REPORT_DIR",
    "reports",
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:3000",
)