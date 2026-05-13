from pydantic import BaseModel
from typing import Optional

class Customer(BaseModel):
    id: int
    company_name: str
    email: str
    country: str
    industry: str
    joined_at: str
    status: str