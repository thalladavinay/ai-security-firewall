from pydantic import BaseModel


class TeamCreate(BaseModel):

    name: str

    organization_id: int



class TeamResponse(BaseModel):

    id: int

    name: str

    organization_id: int


    class Config:
        from_attributes = True