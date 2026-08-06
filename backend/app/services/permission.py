from sqlalchemy.orm import Session

from app.models.role import Role


def check_permission(
    db: Session,
    role_name: str
):

    role = db.query(
        Role
    ).filter(
        Role.name == role_name
    ).first()


    if role:
        return True

    return False