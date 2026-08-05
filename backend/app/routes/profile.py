from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.user import User

import shutil
import os

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)

UPLOAD_DIR = "uploads/profile_pictures"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True,
)


@router.post("/picture")
def upload_picture(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    filename = f"{current_user['id']}_{file.filename}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename,
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    user = (
        db.query(User)
        .filter(User.id == current_user["id"])
        .first()
    )

    user.profile_picture = filename

    db.commit()

    return {
        "message": "Profile picture uploaded.",
        "filename": filename,
    }