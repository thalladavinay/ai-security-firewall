from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import secrets

from app.core.database import get_db
from app.models.api_key import APIKey

router = APIRouter(
    prefix="/api-keys",
    tags=["API Keys"]
)


@router.get("/")
def get_keys(
    db: Session = Depends(get_db)
):

    return db.query(APIKey).all()


@router.post("/")
def create_key(
    name: str,
    db: Session = Depends(get_db)
):

    api_key = APIKey(
        name=name,
        key=secrets.token_hex(32)
    )

    db.add(api_key)
    db.commit()
    db.refresh(api_key)

    return api_key