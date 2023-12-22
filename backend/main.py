from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from routes import routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tags_metadata = [
    {
        "name": "Auth",
        "description": "Ручки для авотризации пользователя",
    },
    {
        "name": "Dishes",
        "description": "Ручки для работы с блюдами",
    },
    {
        "name": "Recipes",
        "description": "Ручки для работы с блюдами",
    },
    {
        "name": "Images",
        "description": "Ручки для работы с изображениями",
    },
    {
        "name": "Registration",
        "description": "Ручки для работы с изображениями",
    },
]


@app.get("/")
async def root():
    return {"message": "Hello World"}


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(title="RecipeBookApi",
                                 version="0.6",
                                 routes=app.routes)

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.include_router(routes)
app.openapi = custom_openapi
