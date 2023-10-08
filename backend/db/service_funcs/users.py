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
