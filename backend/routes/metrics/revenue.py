from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.metrics import revenue as revenue_service

router = APIRouter()

@router.get("/summary")
def get_revenue_summary(db: Session = Depends(get_db)):
    return revenue_service.get_revenue_summary(db)

@router.get("/mrr")
def get_mrr(db: Session = Depends(get_db)):
    return {"mrr": revenue_service.get_mrr(db)}

@router.get("/arr")
def get_arr(db: Session = Depends(get_db)):
    return {"arr": revenue_service.get_arr(db)}

@router.get("/churned")
def get_churned_mrr(db: Session = Depends(get_db)):
    return {"churned_mrr": revenue_service.get_churned_mrr(db)}