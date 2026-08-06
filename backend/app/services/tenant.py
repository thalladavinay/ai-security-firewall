from sqlalchemy.orm import Session

from app.models.organization import Organization


def get_organization(
    db: Session,
    organization_id: int
):

    return db.query(
        Organization
    ).filter(
        Organization.id == organization_id
    ).first()