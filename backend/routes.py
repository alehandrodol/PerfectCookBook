from fastapi import APIRouter

from handlers import auth, register, dishes, recipes, images

routes = APIRouter()

routes.include_router(auth.router, prefix="/auth")
routes.include_router(register.router, prefix="/register")
routes.include_router(dishes.router, prefix="/dishes")
routes.include_router(recipes.router, prefix="/recipes")
routes.include_router(images.router)
