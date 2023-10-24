from sqlalchemy import Column, Integer, ForeignKey, Table

from db.config import METADATA


RecipeTag = Table('t_recipe_tag', METADATA,
                  Column('recipe_id', Integer, ForeignKey('t_recipes.id')),
                  Column('tag_id', Integer, ForeignKey('t_tags.id')))
