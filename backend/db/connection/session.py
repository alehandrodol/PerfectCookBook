import logging

from environs import Env
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

logger = logging.getLogger(__name__)


class SessionManager:
    """
    A class that implements the necessary functionality for working with the database:
    issuing sessions, storing and updating connection settings.
    """

    def __init__(self) -> None:
        self.refresh()

    def __new__(cls):
        if not hasattr(cls, "instance"):
            cls.instance = super(SessionManager, cls).__new__(cls)
        return cls.instance  # noqa

    def get_session_maker(self) -> sessionmaker:
        return sessionmaker(self.engine, class_=AsyncSession, expire_on_commit=False)

    def refresh(self) -> None:
        self.engine = create_async_engine(get_db_address(), echo=True, future=True)


def get_db_address(path: str = None) -> str:
    env = Env()
    env.read_env(path)
    db = env.str('POSTGRES_DB')
    user = env.str('POSTGRES_USER')
    password = env.str('POSTGRES_PASSWORD')
    port = env.str('POSTGRES_PORT')
    host = env.str('POSTGRES_HOST')
    url = f'postgresql+asyncpg://{user}:{password}@{host}:{port}/{db}'
    return url


def get_sync_db_address(path: str = None) -> str:
    env = Env()
    env.read_env(path)
    db = env.str('POSTGRES_DB')
    user = env.str('POSTGRES_USER')
    password = env.str('POSTGRES_PASSWORD')
    port = env.str('POSTGRES_PORT')
    host = env.str('POSTGRES_HOST')
    url = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{db}'
    return url


__all__ = [
    "SessionManager",
    "get_db_address",
    "get_sync_db_address",
]