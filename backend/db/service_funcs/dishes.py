from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.schemas import dishes as dish_schemas

from db.models import Dish, Tag
from db.service_funcs.utils import async_db_session


@async_db_session
async def insert_dish(dish: Dish, db_session: AsyncSession) -> Dish:
    db_session.add(dish)
    await db_session.commit()
    await db_session.refresh(dish, attribute_names=["tags"])
    return dish


@async_db_session
async def get_dish_by_id(dish_id: int, db_session: AsyncSession) -> Dish:
    q = select(Dish).where(Dish.id == dish_id)
    dish: Dish = await db_session.scalar(q)
    return dish


@async_db_session
async def update_dish(
        dish_id: int,
        updates: dish_schemas.UpdateDish,
        db_session: AsyncSession) -> Dish:
    dish: Dish = await db_session.get(Dish, dish_id)

    dish.name = updates.name
    dish.image_url = updates.image_url

    if updates.tags is not None:
        tags: list[Tag] = [Tag(name=tag.name) for tag in updates.tags]
        dish.tags = tags

    await db_session.commit()
    await db_session.refresh(dish, attribute_names=["tags"])
    return dish


@async_db_session
async def delete_dish(dish_id: int, db_session: AsyncSession) -> None:
    dish: Dish = await db_session.get(Dish, dish_id)
    await db_session.delete(instance=dish)
    await db_session.commit()


@async_db_session
async def get_user_dishes(user_id: int, db_session: AsyncSession) -> list[Dish]:
    q = select(Dish).where(Dish.user_id == user_id)
    dishes: list[Dish] = list((await db_session.scalars(q)).all())
    return dishes

