from sqlalchemy import Column, Integer, ForeignKey, Table

from db.config.db import METADATA

recipe_tag_association_table = Table('t_recipe_tag', METADATA,
                                     Column('recipe_id', Integer, ForeignKey('t_recipes.id')),
                                     Column('tag_id', Integer, ForeignKey('t_tags.id')))
