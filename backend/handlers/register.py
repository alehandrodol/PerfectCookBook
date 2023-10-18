from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext

from db.service_funcs import users as db_users
from db.models import User
from db.schemas import users as user_schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


@router.post("/", status_code=201, response_model=user_schemas.UserOut)
async def register(new_user: user_schemas.UserIn):
    user: User = await db_users.get_user_by_login(new_user.login)
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    new_user = await db_users.insert_user(
        User(
            login=new_user.login,
            password_hash=get_password_hash(new_user.password)
        )
    )

    return user_schemas.UserOut.model_validate(new_user)


def get_password_hash(password):
    return pwd_context.hash(password)
