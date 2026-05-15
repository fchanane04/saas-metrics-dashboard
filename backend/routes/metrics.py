from fastapi import APIRouter
from services import metrics_service
from models.schemas import Customer, Subscription, Transaction, Event
from typing import List

router = APIRouter()

@router.get("/customers", response_model=List[Customer])
def get_customers():
    return metrics_service.get_customers()

@router.get("/subscriptions", response_model=List[Subscription])
def get_subscriptions():
    return metrics_service.get_subscriptions()

@router.get("/transactions", response_model=List[Transaction])
def get_transactions():
    return metrics_service.get_transactions()

@router.get("/events", response_model=List[Event])
def get_events():
    return metrics_service.get_events()