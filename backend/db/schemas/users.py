from typing import Optional

from pydantic import BaseModel, field_validator


class UserIn(BaseModel):
    login: str
    password: str

    @field_validator('login')
    def validate_login(cls, v: str):
        if len(v) < 3:
            raise ValueError('must be at least 3 length')
        return v


class UserOut(BaseModel):
    uuid: int
    login: str
    firstname: Optional[str]
    lastname: Optional[str]

    class Config:
        from_attributes = True

