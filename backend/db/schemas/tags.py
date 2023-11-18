from pydantic import BaseModel, field_validator


class TagCreate(BaseModel):
    name: str

    @field_validator('name')
    def validate_name(cls, v: str):
        if len(v) < 3:
            raise ValueError('must be at least 3 length')
        return v


class Tag(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
