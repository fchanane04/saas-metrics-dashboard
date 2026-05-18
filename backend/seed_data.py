import json
import sys
from pathlib import Path
from datetime import datetime

#backend/
sys.path.append(str(Path(__file__).parent))

from database import Base, engine, SessionLocal
from models.schemas import CustomerModel, SubscriptionModel, TransactionModel, EventModel, BusinessModel
from config.settings import settings

def load_json(filename: str):
    with open(settings.DATA_DIR / filename) as f:
        return json.load(f)

def seed():
    # Create all tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        businesses = load_json("businesses.json")
        for b in businesses:
            db.add(BusinessModel(**b))
        print(f"Inserted {len(businesses)} businesses")
    
        customers = load_json("customers.json")
        for c in customers:
            db.add(CustomerModel(**c))
        print(f"Inserted {len(customers)} customers")

        subscriptions = load_json("subscriptions.json")
        for s in subscriptions:
            db.add(SubscriptionModel(**s))
        print(f"Inserted {len(subscriptions)} subscriptions")

        transactions = load_json("transactions.json")
        for t in transactions:
            db.add(TransactionModel(**t))
        print(f"Inserted {len(transactions)} transactions")

        events = load_json("events.json")
        for e in events:
            db.add(EventModel(**e))
        print(f"Inserted {len(events)} events")

        db.commit()
        print("\nDatabase seeded successfully!")

    except Exception as ex:
        db.rollback()
        print(f"Error: {ex}")

    finally:
        db.close()

if __name__ == "__main__":
    seed()