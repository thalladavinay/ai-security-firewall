from sqlalchemy.orm import Session

from app.models.integration import Integration


def get_integrations(
    db: Session
):

    return db.query(
        Integration
    ).all()



def create_integration(
    db: Session,
    name: str,
    provider: str
):

    integration = Integration(
        name=name,
        provider=provider
    )

    db.add(integration)
    db.commit()
    db.refresh(integration)

    return integration