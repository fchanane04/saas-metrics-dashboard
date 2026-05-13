from fastapi import APIRouter
from services import metrics_service
from models.schemas import Customer
from typing import List

router = APIRouter()

@router.get("/customers", response_model=List[Customer])
def get_customers():
    return metrics_service.get_customers()