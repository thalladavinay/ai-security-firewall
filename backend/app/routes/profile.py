import os
import shutil

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)

UPLOAD_DIR = "uploads/profile_pictures"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/picture")
def upload_picture(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected.",
        )

    filename = f"{current_user['id']}_{os.path.basename(file.filename)}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    user = (
        db.query(User)
        .filter(User.id == current_user["id"])
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    user.profile_picture = filename

    db.commit()
    db.refresh(user)

    return {
        "message": "Profile picture uploaded successfully.",
        "filename": filename,
    }


@router.get("/me")
def get_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user = (
        db.query(User)
        .filter(User.id == current_user["id"])
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user