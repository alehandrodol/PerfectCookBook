from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from db.config import DeclarativeBase


class User(DeclarativeBase):
    __tablename__ = "t_users"

    uuid = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    login = Column(String(32), nullable=False)
    password_hash = Column(String(64), nullable=False)
    firstname = Column(String(64), nullable=True)
    lastname = Column(String(64), nullable=True)

    dishes = relationship('Dish', back_populates='user')
