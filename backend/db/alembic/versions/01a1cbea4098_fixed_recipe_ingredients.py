"""fixed Recipe ingredients

Revision ID: 01a1cbea4098
Revises: 1db3d739dab7
Create Date: 2023-10-08 04:21:50.937515

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '01a1cbea4098'
down_revision: Union[str, None] = '1db3d739dab7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(op.f('uq__t_dishes__id'), 't_dishes', ['id'])
    op.create_unique_constraint(op.f('uq__t_ingredients__id'), 't_ingredients', ['id'])
    op.create_unique_constraint(op.f('uq__t_recipes__id'), 't_recipes', ['id'])
    op.create_unique_constraint(op.f('uq__t_tags__id'), 't_tags', ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(op.f('uq__t_tags__id'), 't_tags', type_='unique')
    op.drop_constraint(op.f('uq__t_recipes__id'), 't_recipes', type_='unique')
    op.drop_constraint(op.f('uq__t_ingredients__id'), 't_ingredients', type_='unique')
    op.drop_constraint(op.f('uq__t_dishes__id'), 't_dishes', type_='unique')
    # ### end Alembic commands ###