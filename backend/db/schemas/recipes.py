from typing import Optional

from pydantic import BaseModel, field_validator

from db.schemas.tags import Tag, TagCreate
from db.schemas.ingredients import Ingredient, IngredientCreate


class Recipe(BaseModel):
    id: int
    image_url: Optional[str] = None
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


class BaseRecipe(BaseModel):
    dish_id: int
    image_url: Optional[str] = None
    name: str
    description: str
    cooking_flow: str
    rating: float
    cooked_times: int = 0


class RecipeCreate(BaseRecipe):
    tags: list[TagCreate] = []
    ingredients: list[IngredientCreate] = []


# логика тут в том, что если приходят тэги/ингредиенты
# - старые удаляем новые ставим, не приходят - не меняем
class RecipeUpdate(BaseRecipe):
    tags: Optional[list[TagCreate]] = None
    ingredients: Optional[list[IngredientCreate]] = None


