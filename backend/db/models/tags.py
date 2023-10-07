from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from db.config import DeclarativeBase
from db.models.dish_tag import dish_tag_association_table
from db.models.recipe_tag import recipe_tag_association_table


class Tag(DeclarativeBase):
    __tablename__ = "t_tags"

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    name = Column(String(32), nullable=False)

    dishes = relationship('Dish', secondary=dish_tag_association_table, back_populates='tags')
    recipes = relationship('Recipe', secondary=recipe_tag_association_table, back_populates='tags')
