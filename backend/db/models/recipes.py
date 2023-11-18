from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship

from db.config import DeclarativeBase
from db.models.recipe_tag import RecipeTag


class Recipe(DeclarativeBase):
    __tablename__ = "t_recipes"

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    image_url = Column(String(256), nullable=True)
    name = Column(String(128), nullable=False)
    description = Column(String, nullable=False)
    cooking_flow = Column(String, nullable=False)
    dish_id = Column(Integer, ForeignKey('t_dishes.id'))
    dt = Column(DateTime, nullable=False)
    rating = Column(Float, nullable=False)
    cooked_times = Column(Integer, nullable=False)

    dish = relationship('Dish', back_populates='recipes', lazy='selectin')

    # сейчас логика связи такая, что для рецепта создаются уникальные тэги,
    # поэтому single_parent=true и каскад на удаление
    tags = relationship('Tag',
                        secondary=RecipeTag,
                        back_populates='recipes',
                        cascade='all, delete, delete-orphan',
                        single_parent=True)

    # сейчас логика связи такая, что для рецепта создаются уникальные ингредиенты,
    # поэтому single_parent=true и каскад на удаление
    ingredients = relationship('Ingredient',
                               back_populates='recipe',
                               lazy='selectin',
                               cascade='all, delete, delete-orphan',
                               single_parent=True)
