from fastapi import FastAPI
from routes.metrics import router as metrics_router
from database import Base, engine

#create all the tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(metrics_router, prefix="/metrics")

@app.get("/")
def root():
    return {"message": "Welcome to saas app"}

@app.get("/health")
def health():
    return {"status": "Good"}