from db.connection import SessionManager


def async_db_session(func):
    async def wrapper(*args, **kwargs):
        print(f'creating db_session for {func.__name__} '
              f'where args={args} and kwargs={kwargs}')
        session_maker = SessionManager().get_session_maker()
        async with session_maker() as session:
            kwargs["db_session"] = session
            result = await func(*args, **kwargs)

        print(f'close db_session for {func.__name__}')

        return result
    return wrapper
