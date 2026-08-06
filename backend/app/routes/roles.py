from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.role import Role

try:
    from app.schemas.role import (
        RoleCreate,
        RoleResponse,
    )
    USE_SCHEMA = True
except ImportError:
    USE_SCHEMA = False

router = APIRouter(
    prefix="/roles",
    tags=["Roles"],
)


@router.get("/")
def get_roles(
    db: Session = Depends(get_db),
):
    return (
        db.query(Role)
        .order_by(Role.name)
        .all()
    )


if USE_SCHEMA:

    @router.post(
        "/",
        response_model=RoleResponse,
        status_code=201,
    )
    def create_role(
        role_data: RoleCreate,
        db: Session = Depends(get_db),
    ):
        existing_role = (
            db.query(Role)
            .filter(
                Role.name == role_data.name
            )
            .first()
        )

        if existing_role:
            raise HTTPException(
                status_code=400,
                detail="Role already exists.",
            )

        role = Role(
            name=role_data.name,
            description=role_data.description,
        )

        db.add(role)
        db.commit()
        db.refresh(role)

        return role

else:

    @router.post("/")
    def create_role(
        name: str,
        description: str = None,
        db: Session = Depends(get_db),
    ):
        existing_role = (
            db.query(Role)
            .filter(Role.name == name)
            .first()
        )

        if existing_role:
            raise HTTPException(
                status_code=400,
                detail="Role already exists.",
            )

        role = Role(
            name=name,
            description=description,
        )

        db.add(role)
        db.commit()
        db.refresh(role)

        return role