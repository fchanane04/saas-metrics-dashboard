from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    APP_ENV: str = "development"
    DEBUG: bool = True
    
    # Path to data folder (next to backend/)
    DATABASE_URL: str = "sqlite:///./saas_metrics.db"
    DATA_DIR: Path = Path(__file__).resolve().parent.parent.parent / "data"

    #auth
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    #telling app where to get the configs
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()