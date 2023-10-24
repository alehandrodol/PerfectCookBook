from fastapi import APIRouter

from handlers import auth, register, dishes

routes = APIRouter()

routes.include_router(auth.router, prefix="/auth")
routes.include_router(register.router, prefix="/register")
routes.include_router(dishes.router, prefix="/dishes")
