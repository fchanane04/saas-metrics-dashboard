from passlib.context import CryptContext
from sqlalchemy.orm import Session
from datetime import datetime
from models.schemas import UserModel
from auth.jwt import create_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def register_user(db: Session, email: str, password: str):
    # Check if email already exists
    existing = db.query(UserModel).filter(UserModel.email == email).first()
    if existing:
        return None

    user = UserModel(
        email=email,
        hashed_password=hash_password(password),
        created_at=datetime.utcnow().isoformat()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def login_user(db: Session, email: str, password: str):
    user = db.query(UserModel).filter(UserModel.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    token = create_access_token({"sub": user.email, "id": user.id})
    return token