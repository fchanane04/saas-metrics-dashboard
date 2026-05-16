from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.schemas import UserRegister, UserResponse, Token
from auth import auth_service

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserRegister, db: Session = Depends(get_db)):
    new_user = auth_service.register_user(db, user.email, user.password)
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return new_user

@router.post("/login", response_model=Token)
def login(user: UserRegister, db: Session = Depends(get_db)):
    token = auth_service.login_user(db, user.email, user.password)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    return {"access_token": token, "token_type": "bearer"}