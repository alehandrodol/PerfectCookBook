from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from db.models import Dish
from db.service_funcs.utils import async_db_session


@async_db_session
async def insert_dish(dish: Dish, db_session: AsyncSession) -> Dish:
    db_session.add(dish)
    await db_session.commit()
    await db_session.refresh(dish, attribute_names=["tags"])
    return dish


@async_db_session
async def get_user_dishes(user_id: int, db_session: AsyncSession) -> list[Dish]:
    q = select(Dish).where(Dish.user_id == user_id)
    dishes: list[Dish] = list((await db_session.scalars(q)).all())
    return dishes

