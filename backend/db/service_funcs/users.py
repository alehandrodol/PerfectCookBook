from typing import Optional

from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import User
from db.service_funcs.utils import async_db_session


@async_db_session
async def get_user_by_login(login: str, db_session: AsyncSession) -> Optional[User]:
    q = select(User).where(User.login == login)
    user: User = await db_session.scalar(q)
    return user


@async_db_session
async def insert_user(user: User, db_session: AsyncSession) -> User:
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user

