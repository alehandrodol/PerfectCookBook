from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.schemas import recipes as recipe_schemas
from sqlalchemy.orm import selectinload, joinedload

from db.models import Recipe
from db.service_funcs.utils import async_db_session


@async_db_session
async def get_all_by_dish_id(dish_id: int, db_session: AsyncSession) -> Recipe:
    q = (
        select(Recipe)
        .options(joinedload(Recipe.tags), joinedload(Recipe.ingredients))
        .where(Recipe.dish_id == dish_id)
    )
    recipes: list[Recipe] = list((await db_session.scalars(q)).unique().all())
    return recipes


@async_db_session
async def insert_recipe(recipe: Recipe, db_session: AsyncSession) -> Recipe:
    db_session.add(recipe)
    await db_session.commit()
    await db_session.refresh(recipe, attribute_names=["tags", "ingredients"])
    return recipe
