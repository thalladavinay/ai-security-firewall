from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
    )


class UserLogin(BaseModel):
    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
    )


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    is_admin: bool
    email_verified: bool

    class Config:
        from_attributes = True