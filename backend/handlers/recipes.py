import time
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from db.connection import SessionManager
from db.models import Recipe, Tag, Ingredient, Dish
from db.schemas import recipes as recipe_schemas
from db.schemas.users import UserOut
from db.service_funcs import recipes as serv_recipes, tags as serv_tags, dishes as serv_dishes

from handlers.auth import get_current_user

router = APIRouter()


@router.get("/", response_model=recipe_schemas.RecipesOut, tags=["Recipes"])
async def get_recipes(dish_id: int, current_user: Annotated[UserOut, Depends(get_current_user)]):
    dish = await serv_dishes.get_dish_by_id(dish_id)

    if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dish not found"
        )

    if dish.user_id != current_user.uuid:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not own the dish",
        )

    recipes = await serv_recipes.get_all_by_dish_id(dish_id)

    return recipe_schemas.RecipesOut(
        user_uuid=current_user.uuid,
        dish_id=dish_id,
        recipes=[recipe_schemas.Recipe.model_validate(recipe) for recipe in recipes]
    )


@router.post("/create", response_model=recipe_schemas.Recipe, tags=["Recipes"])
async def create_recipe(
        new_recipe: recipe_schemas.RecipeCreate,
        current_user: Annotated[UserOut, Depends(get_current_user)]):

    dish = await serv_dishes.get_dish_by_id(new_recipe.dish_id)

    if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dish not found"
        )

    if dish.user_id != current_user.uuid:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not own the dish",
        )

    recipe = Recipe(
        name=new_recipe.name,
        image_url=new_recipe.image_url,
        description=new_recipe.description,
        cooking_flow=new_recipe.cooking_flow,
        rating=new_recipe.rating,
        cooked_times=new_recipe.cooked_times,
        dish_id=new_recipe.dish_id,
        dt=datetime.fromtimestamp(time.time()),
        tags=[Tag(name=tag.name) for tag in new_recipe.tags],
        ingredients=[
            Ingredient(
                name=ingredient.name,
                quantity=ingredient.quantity,
                comment=ingredient.comment
            ) for ingredient in new_recipe.ingredients
        ]
    )

    recipe = await serv_recipes.insert(recipe)
    recipe_out = recipe_schemas.Recipe.model_validate(recipe)

    return recipe_out


@router.put("/{recipe_id}", response_model=recipe_schemas.Recipe, tags=["Recipes"])
async def edit_recipe(
        recipe_id: int,
        updates: recipe_schemas.RecipeUpdate,
        current_user: Annotated[UserOut, Depends(get_current_user)]):

    recipe: Recipe = await serv_recipes.get_by_id(recipe_id)

    dish: Dish = recipe.dish

    if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dish not found"
        )

    if dish.user_id != current_user.uuid:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not own the dish",
        )

    recipe = await serv_recipes.update(recipe_id, updates)

    recipe_out = recipe_schemas.Recipe.model_validate(recipe)
    return recipe_out


@router.delete("/{recipe_id}", status_code=204, tags=["Recipes"])
async def delete_recipe(
        recipe_id: int,
        current_user: Annotated[UserOut, Depends(get_current_user)]):

    recipe: Recipe = await serv_recipes.get_by_id(recipe_id)

    if recipe is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found"
        )

    dish: Dish = recipe.dish

    if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dish not found"
        )

    if dish.user_id != current_user.uuid:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not own the dish",
        )

    await serv_recipes.delete(recipe_id)

