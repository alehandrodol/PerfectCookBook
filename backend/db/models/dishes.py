from sqlalchemy import Column, Integer, String, ForeignKey

from db.config import DeclarativeBase
from sqlalchemy.orm import relationship

from backend.db.models.dish_tag import dish_tag_association_table


class Dish(DeclarativeBase):
    __tablename__ = "t_dishes"

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    name = Column(String(128), nullable=False)
    user_id = Column(Integer, ForeignKey('t_users.uuid'))

    user = relationship('User', back_populates='dishes')
    recipes = relationship('Recipe', back_populates='dish')
    tags = relationship('Tag', secondary=dish_tag_association_table, back_populates='dishes')


