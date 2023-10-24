from typing import Optional

from pydantic import BaseModel, field_validator

from db.schemas.tags import Tag


class CreateDish(BaseModel):
    name: str
    tags: list[str] = []


class Dish(BaseModel):
    id: int
    name: str
    user_id: int
    tags: list[Tag] = []

    class Config:
        arbitrary_types_allowed = True
        from_attributes = True


class DishesOut(BaseModel):
    user_uuid: int
    dishes: list[Dish]
