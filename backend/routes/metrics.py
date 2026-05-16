from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services import metrics_service
from models.schemas import Customer, Subscription, Transaction, Event
from typing import List

router = APIRouter()

@router.get("/customers", response_model=List[Customer])
def get_customers(db: Session = Depends(get_db)):
    return metrics_service.get_customers(db)

@router.get("/subscriptions", response_model=List[Subscription])
def get_subscriptions(db: Session = Depends(get_db)):
    return metrics_service.get_subscriptions(db)

@router.get("/transactions", response_model=List[Transaction])
def get_transactions(db: Session = Depends(get_db)):
    return metrics_service.get_transactions(db)

@router.get("/events", response_model=List[Event])
def get_events(db: Session = Depends(get_db)):
    return metrics_service.get_events(db)