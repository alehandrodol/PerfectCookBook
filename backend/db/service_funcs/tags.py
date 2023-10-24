from sqlalchemy.ext.asyncio import AsyncSession

from db.models import Tag
from db.service_funcs.utils import async_db_session


@async_db_session
async def insert_tag(tag: Tag, db_session: AsyncSession) -> Tag:
    db_session.add(tag)
    await db_session.commit()
    await db_session.refresh(tag)
    return tag
