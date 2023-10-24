from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db.config import DeclarativeBase
from db.models.dish_tag import DishTag


class Dish(DeclarativeBase):
    __tablename__ = "t_dishes"

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    name = Column(String(128), nullable=False)
    user_id = Column(Integer, ForeignKey('t_users.uuid'))

    user = relationship('User', back_populates='dishes')
    recipes = relationship('Recipe', back_populates='dish')
    tags = relationship('Tag', secondary=DishTag, back_populates='dishes')


