from typing import Optional

from pydantic import BaseModel, field_validator

from db.schemas.tags import Tag, TagCreate


class BaseDish(BaseModel):
    name: str
    image_url: Optional[str] = None

    @field_validator('name')
    def validate_name(cls, v: str):
        if len(v) < 3:
            raise ValueError('must be at least 3 length')
        return v


class CreateDish(BaseDish):
    tags: list[TagCreate] = []


# логика тут в том, что если приходят тэги
# - старые удаляем новые ставим, не приходят - не меняем
class UpdateDish(BaseDish):
    tags: Optional[list[TagCreate]] = None


class Dish(BaseModel):
    id: int
    image_url: Optional[str] = None
    name: str
    user_id: int
    tags: list[Tag] = []

    class Config:
        arbitrary_types_allowed = True
        from_attributes = True


class DishesOut(BaseModel):
    user_uuid: int
    dishes: list[Dish]
