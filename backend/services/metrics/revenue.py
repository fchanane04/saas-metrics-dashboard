from sqlalchemy.orm import Session
from models.schemas import SubscriptionModel
from sqlalchemy import func

'''
MRR              → sum of all active subscription prices
ARR              → MRR * 12
MRR Growth Rate  → % change vs last month
Churned MRR      → revenue lost from cancellations
'''

def get_mrr(db: Session) -> float:
    """Sum of all active subscription prices"""
    result = db.query(
        func.sum(SubscriptionModel.price_monthly)
    ).filter(
        SubscriptionModel.status == "active"
    ).scalar()
    return round(result or 0, 2)

def get_arr(db: Session) -> float:
    """MRR * 12"""
    return round(get_mrr(db) * 12, 2)

def get_churned_mrr(db: Session) -> float:
    """Revenue lost from cancelled subscriptions"""
    result = db.query(
        func.sum(SubscriptionModel.price_monthly)
    ).filter(
        SubscriptionModel.status == "cancelled"
    ).scalar()
    return round(result or 0, 2)

def get_revenue_summary(db: Session) -> dict:
    """All revenue KPIs in one call"""
    mrr = get_mrr(db)
    arr = get_arr(db)
    churned_mrr = get_churned_mrr(db)

    return {
        "mrr": mrr,
        "arr": arr,
        "churned_mrr": churned_mrr,
    }