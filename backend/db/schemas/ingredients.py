from pydantic import BaseModel, field_validator


class IngredientCreate(BaseModel):
    name: str
    quantity: str
    comment: str

    @field_validator('name')
    def validate_name(cls, v: str):
        if len(v) < 3:
            raise ValueError('must be at least 3 length')
        return v


class Ingredient(BaseModel):
    id: int
    name: str
    quantity: str
    comment: str

    class Config:
        from_attributes = True
