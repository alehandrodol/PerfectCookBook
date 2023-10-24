from typing import Optional

from pydantic import BaseModel, field_validator


class CreateDish(BaseModel):
    name: str
    tags: list[str] = []


class UpdateDish(CreateDish):
    dish_id: int


class Dish(BaseModel):
    id: int
    name: str
    user_id: int
    tags_names: list[str] = []

    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

