from fastapi import APIRouter

from handlers import auth

routes = APIRouter()

routes.include_router(auth.router, prefix="/auth")
