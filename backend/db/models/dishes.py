from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db.config import DeclarativeBase
from db.models.dish_tag import DishTag


class Dish(DeclarativeBase):
    __tablename__ = "t_dishes"

    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    image_url = Column(String(256), nullable=True)
    name = Column(String(128), nullable=False)
    user_id = Column(Integer, ForeignKey('t_users.uuid'))

    user = relationship('User', back_populates='dishes')

    recipes = relationship('Recipe', back_populates='dish', cascade='all, delete, delete-orphan')

    # сейчас логика связи такая, что для блюда создаются уникальные тэги,
    # поэтому single_parent=true и каскад на удаление
    tags = relationship('Tag',
                        secondary=DishTag,
                        back_populates='dishes',
                        lazy='selectin',
                        cascade='all, delete, delete-orphan',
                        single_parent=True)



