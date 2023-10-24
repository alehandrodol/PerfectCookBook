from pydantic import BaseModel, field_validator


class CreateDish(BaseModel):
    name: str
    tags: list[str] = []

    @field_validator('name')
    def validate_name(cls, v: str):
        if len(v) < 3:
            raise ValueError('must be at least 3 length')
        return v


class Dish(BaseModel):
    id: int
    name: str
    user_id: int
    tags_names: list[str] = []

    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

