import json
from fastapi import HTTPException
from pathlib import Path
from config.settings import settings

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