from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.schemas import recipes as recipe_schemas
from sqlalchemy.orm import selectinload, joinedload

from db.models import Recipe, Tag, Ingredient
from db.service_funcs.utils import async_db_session


@async_db_session
async def get_all_by_dish_id(dish_id: int, db_session: AsyncSession) -> list[Recipe]:
    q = (
        select(Recipe)
        .options(joinedload(Recipe.tags), joinedload(Recipe.ingredients))
        .where(Recipe.dish_id == dish_id)
    )
    recipes: list[Recipe] = list((await db_session.scalars(q)).unique().all())
    return recipes


@async_db_session
async def get_by_id(recipe_id: int, db_session: AsyncSession) -> Recipe:
    recipe: Recipe = await db_session.get(Recipe, recipe_id)
    return recipe


@async_db_session
async def insert(recipe: Recipe, db_session: AsyncSession) -> Recipe:
    db_session.add(recipe)
    await db_session.commit()
    await db_session.refresh(recipe, attribute_names=["tags", "ingredients"])
    return recipe


@async_db_session
async def update(
        recipe_id: int,
        updates: recipe_schemas.RecipeUpdate,
        db_session: AsyncSession) -> Recipe:

    # без этого вылетает ошибка, хотя для dishes этого не надо, хз почему
    options = []
    if updates.tags is not None:
        options.append(joinedload(Recipe.tags))
    if updates.ingredients is not None:
        options.append(joinedload(Recipe.ingredients))

    recipe: Recipe = await db_session.get(
        Recipe, recipe_id,
        options=options
    )

    recipe.name = updates.name
    recipe.description = updates.description
    recipe.cooking_flow = updates.cooking_flow
    recipe.rating = updates.rating
    recipe.cooked_times = updates.cooked_times

    if updates.tags is not None:
        tags: list[Tag] = [Tag(name=tag.name) for tag in updates.tags]
        recipe.tags = tags

    if updates.ingredients is not None:
        ingredients: list[Ingredient] = [
            Ingredient(
                name=ingredient.name,
                quantity=ingredient.quantity,
                comment=ingredient.comment
            ) for ingredient in updates.ingredients
        ]
        recipe.ingredients = ingredients

    await db_session.commit()
    await db_session.refresh(recipe, attribute_names=["tags", "ingredients"])
    return recipe


@async_db_session
async def delete(recipe_id: int, db_session: AsyncSession) -> None:
    recipe: Recipe = await db_session.get(Recipe, recipe_id)
    await db_session.delete(instance=recipe)
    await db_session.commit()
