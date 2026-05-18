import json
from fastapi import HTTPException
from pathlib import Path
from config.settings import settings

from sqlalchemy.orm import Session
from models.schemas import CustomerModel, SubscriptionModel, TransactionModel, EventModel, BusinessModel

'''
#reusable function
def load_json(filename: str):
    try:
        with open(settings.DATA_DIR / filename) as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"{filename} not found")

    #if file has broken json
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"{filename} is not valid JSON")

def get_customers():
    return load_json("customers.json")

def get_subscriptions():
    return load_json("subscriptions.json")

def get_transactions():
    return load_json("transactions.json")

def get_events():
    return load_json("events.json")
'''

def get_business(db: Session, user_id: int):
    return db.query(BusinessModel).filter(BusinessModel.user_id == user_id).first()

def get_customers(db: Session, user_id: int):
    return db.query(CustomerModel).filter(CustomerModel.user_id == user_id).all()

def get_subscriptions(db: Session, user_id: int):
    return db.query(SubscriptionModel).filter(SubscriptionModel.user_id == user_id).all()

def get_transactions(db: Session, user_id: int):
    return db.query(TransactionModel).filter(TransactionModel.user_id == user_id).all()

def get_events(db: Session, user_id: int):
    return db.query(EventModel).filter(EventModel.user_id == user_id).all()