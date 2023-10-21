from fastapi import APIRouter

from handlers import auth, register

routes = APIRouter()

routes.include_router(auth.router, prefix="/auth")
routes.include_router(register.router, prefix="/register")
