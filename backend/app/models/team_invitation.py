from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Boolean
)

from app.core.database import Base


class TeamInvitation(Base):

    __tablename__ = "team_invitations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    email = Column(
        String,
        nullable=False
    )


    organization_id = Column(
        Integer,
        ForeignKey(
            "organizations.id"
        ),
        nullable=False
    )


    role = Column(
        String,
        default="user"
    )


    accepted = Column(
        Boolean,
        default=False
    )