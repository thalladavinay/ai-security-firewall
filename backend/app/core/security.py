from datetime import datetime, timedelta, UTC
from typing import Optional
import os

from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext

# Load environment variables
load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set in the .env file.")

ALGORITHM = os.getenv("ALGORITHM", "HS256")

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)
)

# Password hashing
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    """
    Hash a plain-text password.
    """
    return pwd_context.hash(password)


def verify_password(
    password: str,
    hashed_password: str,
) -> bool:
    """
    Verify a password against its hashed value.
    """
    return pwd_context.verify(
        password,
        hashed_password,
    )


def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    Create a JWT access token.
    """
    to_encode = data.copy()

    expire = datetime.now(UTC) + (
        expires_delta
        if expires_delta
        else timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def decode_access_token(
    token: str,
) -> Optional[dict]:
    """
    Decode and validate a JWT.
    Returns the payload if valid,
    otherwise None.
    """
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        return payload

    except JWTError:
        return None