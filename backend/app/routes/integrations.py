from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.integration import Integration

router = APIRouter(
    prefix="/integrations",
    tags=["Integrations"]
)


@router.get("/")
def get_integrations(
    db: Session = Depends(get_db)
):

    return db.query(Integration).all()


@router.post("/")
def create_integration(
    name: str,
    provider: str,
    db: Session = Depends(get_db)
):

    integration = Integration(
        name=name,
        provider=provider
    )

    db.add(integration)
    db.commit()
    db.refresh(integration)

    return integration