from sqlalchemy import Column, Integer, ForeignKey, Table

from db.config import DeclarativeBase

recipe_tag_association_table = Table('t_recipe_tag', DeclarativeBase.metadata,
                                     Column('recipe_id', Integer, ForeignKey('t_recipes.id')),
                                     Column('tag_id', Integer, ForeignKey('t_tags.id')))
