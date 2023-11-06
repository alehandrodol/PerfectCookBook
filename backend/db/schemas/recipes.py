from pydantic import BaseModel, field_validator

from db.schemas.tags import Tag
from db.schemas.ingredients import Ingredient


class Recipe(BaseModel):
    id: int
    name: str
    description: str
    cooking_flow: str
    rating: float
    cooked_times: int
    tags: list[Tag] = []
    ingredients: list[Ingredient] = []

    class Config:
        from_attributes = True


class RecipesOut(BaseModel):
    user_uuid: int
    dish_id: int
    recipes: list[Recipe]


class IngredientDTO(BaseModel):
    name: str
    quantity: str
    comment: str


class RecipeCreate(BaseModel):
    dish_id: int
    name: str
    description: str
    cooking_flow: str
    rating: float
    cooked_times: int = 0
    tags: list[str] = []

    ingredients: list[IngredientDTO] = []


