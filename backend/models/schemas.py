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

class Subscription(BaseModel):
    id: int
    customer_id: int
    plan: str
    price_monthly: float
    status: str
    started_at: str
    cancelled_at: Optional[str] = None
    trial_ends_at: Optional[str] = None

class Transaction(BaseModel):
    id: int
    customer_id: int
    subscription_id: int
    amount: float
    currency: str
    status: str
    date: str
    month: str

class Event(BaseModel):
    id: int
    customer_id: int
    type: str
    date: str