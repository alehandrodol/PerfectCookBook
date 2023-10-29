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

    @field_validator('password')
    def validate_password(cls, v: str):
        if len(v) < 8:
            raise ValueError('must be at least 8 length')
        if not any(char.isupper() for char in v):
            raise ValueError('must contain at least one uppercase letter')
        if not any(char.islower() for char in v):
            raise ValueError('must contain at least one lowercase letter')
        if not any(char.isdigit() for char in v):
            raise ValueError('must contain at least one digit')
        special_chars = "!@#$%^&*()_+-=[]{}|\\;:'\",.<>/?"
        if not any(char in special_chars for char in v):
            raise ValueError('must contain at least one special character')
        return v


class UserOut(BaseModel):
    uuid: int
    login: str
    firstname: Optional[str]
    lastname: Optional[str]

    class Config:
        from_attributes = True

