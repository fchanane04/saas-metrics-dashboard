from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services import data_access
from models.schemas import Customer, Subscription, Transaction, Event
from auth.dependencies import get_current_user
from typing import List

router = APIRouter()
'''
this file is not used
'''

@router.get("/customers", response_model=List[Customer])
def get_customers(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return data_access.get_customers(db, current_user.id)

@router.get("/subscriptions", response_model=List[Subscription])
def get_subscriptions(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return data_access.get_subscriptions(db, current_user.id)

@router.get("/transactions", response_model=List[Transaction])
def get_transactions(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return data_access.get_transactions(db, current_user.id)

@router.get("/events", response_model=List[Event])
def get_events(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return data_access.get_events(db, current_user.id)