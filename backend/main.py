from fastapi import FastAPI
from routes.metrics.data import router as data_router
from routes.metrics.revenue import router as revenue_router
from database import Base, engine

from routes.auth import router as auth_router

#create all the tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router, prefix="/api/auth")
app.include_router(data_router, prefix="/api")
app.include_router(revenue_router, prefix="/metrics/revenue")

@app.get("/")
def root():
    return {"message": "Welcome to saas app"}

@app.get("/health")
def health():
    return {"status": "Good"}