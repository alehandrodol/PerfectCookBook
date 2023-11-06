from pydantic import BaseModel, field_validator


class Ingredient(BaseModel):
    id: int
    name: str
    quantity: str
    comment: str

    class Config:
        from_attributes = True


