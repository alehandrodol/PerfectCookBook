from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from db.config import DeclarativeBase
from db.models import dish_tag_association_table, recipe_tag_association_table


class Tag(DeclarativeBase):
    __tablename__ = "t_tags"

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    name = Column(String(32), nullable=False)

    dishes = relationship('Dish', secondary=dish_tag_association_table, back_populates='tags')
    recipes = relationship('Recipe', secondary=recipe_tag_association_table, back_populates='tags')
