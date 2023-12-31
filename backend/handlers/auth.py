from datetime import datetime, timedelta
from typing import Annotated, Optional
from environs import Env

from jose import JWTError, jwt
from passlib.context import CryptContext
from passlib.exc import UnknownHashError

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from db.service_funcs import users as db_users
from db.models import User
from db.schemas import users as user_schemas


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 180

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

env = Env()
env.read_env()


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> user_schemas.UserOut:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, env.str("SECRET_KEY"), algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user: User = await db_users.get_user_by_login(username)
    if not user:
        raise credentials_exception
    return user_schemas.UserOut.model_validate(user)


@router.get("/check_me", response_model=user_schemas.UserOut, tags=["Auth"])
async def check_me(current_user: Annotated[user_schemas.UserOut, Depends(get_current_user)]):
    return current_user


@router.post("/token", tags=["Auth"])
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user: User = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.login}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


async def authenticate_user(username: str, password: str) -> Optional[User]:
    user: User = await db_users.get_user_by_login(username)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


def verify_password(plain_password, hashed_password):
    try:
        res = pwd_context.verify(plain_password, hashed_password)
    except UnknownHashError:
        return False
    return res


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, env.str("SECRET_KEY"), algorithm=ALGORITHM)
    return encoded_jwt


def get_password_hash(password):
    return pwd_context.hash(password)
