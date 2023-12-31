from sqlalchemy import Column, Integer, ForeignKey, Table, String
from sqlalchemy.orm import relationship

from db.config import DeclarativeBase


class Ingredient(DeclarativeBase):
    __tablename__ = "t_ingredients"

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    name = Column(String(64), nullable=False)
    quantity = Column(String(32), nullable=False)
    comment = Column(String, nullable=False)
    recipe_id = Column(Integer, ForeignKey('t_recipes.id'))

    recipe = relationship('Recipe', back_populates='ingredients')
