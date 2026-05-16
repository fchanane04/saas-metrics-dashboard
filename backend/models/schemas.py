from pydantic import BaseModel
from typing import Optional

from sqlalchemy import Column, Integer, String, Float
from database import Base


# USER MODEL
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(String)

# ── User Pydantic Schemas ──
class UserRegister(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

#sqlalchemy database models => DB tables
class CustomerModel(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String)
    email = Column(String, unique=True)
    country = Column(String)
    industry = Column(String)
    joined_at = Column(String)
    status = Column(String)

class SubscriptionModel(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer)
    plan = Column(String)
    price_monthly = Column(Float)
    status = Column(String)
    started_at = Column(String)
    cancelled_at = Column(String, nullable=True)
    trial_ends_at = Column(String, nullable=True)

class TransactionModel(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer)
    subscription_id = Column(Integer)
    amount = Column(Float)
    currency = Column(String)
    status = Column(String)
    date = Column(String)
    month = Column(String)

class EventModel(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer)
    type = Column(String)
    date = Column(String)

#pyantic => API response shape
class Customer(BaseModel):
    id: int
    company_name: str
    email: str
    country: str
    industry: str
    joined_at: str
    status: str

    class Config:
        from_attributes = True

class Subscription(BaseModel):
    id: int
    customer_id: int
    plan: str
    price_monthly: float
    status: str
    started_at: str
    cancelled_at: Optional[str] = None
    trial_ends_at: Optional[str] = None

    class Config:
        from_attributes = True

class Transaction(BaseModel):
    id: int
    customer_id: int
    subscription_id: int
    amount: float
    currency: str
    status: str
    date: str
    month: str

    class Config:
        from_attributes = True

class Event(BaseModel):
    id: int
    customer_id: int
    type: str
    date: str

    class Config:
        from_attributes = True