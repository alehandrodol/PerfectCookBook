from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.schemas import dishes as dish_schemas

from db.models import Dish
from db.service_funcs.utils import async_db_session


@async_db_session
async def insert_dish(dish: Dish, db_session: AsyncSession) -> Dish:
    db_session.add(dish)
    await db_session.commit()
    await db_session.refresh(dish)
    return dish


@async_db_session
async def get_dish_by_id(id: int, db_session: AsyncSession) -> Dish:
    q = select(Dish).where(Dish.id == id)
    dish: Dish = await db_session.scalar(q)
    return dish


@async_db_session
async def update_dish(
        dish: Dish,
        updates: dish_schemas.UpdateDish,
        db_session: AsyncSession) -> Dish:
    dish.name = updates.name
    await db_session.commit()
    await db_session.refresh(dish)
    return dish


@async_db_session
async def get_user_dishes(user_id: int, db_session: AsyncSession) -> list[Dish]:
    q = select(Dish).where(Dish.user_id == user_id)
    dishes: list[Dish] = list((await db_session.scalars(q)).all())
    return dishes

