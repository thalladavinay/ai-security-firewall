from pydantic import BaseModel, Field


class ScanResult(BaseModel):
    status: str = Field(
        ...,
        description="Overall scan status",
    )

    risk_score: int = Field(
        ...,
        ge=0,
        le=100,
        description="Risk score between 0 and 100",
    )

    threats: list[str] = Field(
        default_factory=list,
        description="List of detected threats",
    )

    message: str = Field(
        ...,
        description="Scan summary message",
    )