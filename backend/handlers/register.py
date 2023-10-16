from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext

from db.service_funcs import users as db_users
from db.models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


@router.post("/register", status_code=201)
async def register(username: str, password: str, firstname: str, lastname: str) -> None:
    user: User = await db_users.get_user_by_login(username)

    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    await db_users.insert_user(
        User(
            login=username,
            password_hash=get_password_hash(password),
            firstname=firstname,
            lastname=lastname,
        )
    )


def get_password_hash(password):
    return pwd_context.hash(password)
