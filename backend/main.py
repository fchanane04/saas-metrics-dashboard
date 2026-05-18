from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from database import Base, engine
from routes.metrics.data import router as data_router
from routes.metrics.revenue import router as revenue_router
from routes.auth import router as auth_router

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(data_router, prefix="/api")
app.include_router(revenue_router, prefix="/api/metrics/revenue")

@app.get("/")
def root():
    return {"message": "SaaS Metrics API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="SaaS Metrics API",
        version="1.0.0",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
        }
    }
    #Apply security to all endpoints, send token with every request
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi