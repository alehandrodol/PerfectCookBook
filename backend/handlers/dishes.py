from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from db.connection import SessionManager
from db.models import Dish, Tag
from db.schemas import dishes as dish_schemas
from db.schemas.users import UserOut
from db.service_funcs import dishes as serv_dishes, tags as serv_tags

from handlers.auth import get_current_user

router = APIRouter()


@router.post("/create", response_model=dish_schemas.Dish)
async def create_dish(new_dish: dish_schemas.CreateDish, current_user: Annotated[UserOut, Depends(get_current_user)]):
    dish = Dish(
        name=new_dish.name,
        user_id=current_user.uuid,
        tags=[Tag(name=tag) for tag in new_dish.tags]
    )

    dish = await serv_dishes.insert_dish(dish)
    dish_out = dish_schemas.Dish.model_validate(dish)

    for tag in new_dish.tags:
        dish_out.tags_names.append(tag)

    return dish_out


@router.post("/edit", response_model=dish_schemas.Dish)
async def edit_dish(updates: dish_schemas.UpdateDish, current_user: Annotated[UserOut, Depends(get_current_user)]):
    dish = await serv_dishes.get_dish_by_id(updates.dish_id)

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

    dish = await serv_dishes.update_dish(dish_id=dish.id, updates=updates)

    dish_out = dish_schemas.Dish.model_validate(dish)
    return dish_out
