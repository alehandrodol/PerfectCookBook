from sqlalchemy import Column, Integer, ForeignKey, Table

from db.config import METADATA

DishTag = Table('t_dish_tag', METADATA,
                Column('dish_id', Integer, ForeignKey('t_dishes.id')),
                Column('tag_id', Integer, ForeignKey('t_tags.id')))
