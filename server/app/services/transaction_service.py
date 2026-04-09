from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.utils.conflict import detect_conflict
from app.services.event_manager import event_manager

import asyncio


# ✅ CREATE TRANSACTION
def create_transaction(db: Session, data):
    transaction = Transaction(**data.dict())

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    # 🔥 Broadcast event (non-blocking)
    try:
        loop = asyncio.get_running_loop()
        loop.create_task(event_manager.broadcast({
            "type": "created",
            "id": str(transaction.id)
        }))
    except RuntimeError:
        # fallback for no event loop
        asyncio.run(event_manager.broadcast({
            "type": "created",
            "id": str(transaction.id)
        }))

    return transaction


# ✅ GET ALL TRANSACTIONS
def get_transactions(db: Session):
    return db.query(Transaction).all()


# ✅ UPDATE TRANSACTION (WITH CONFLICT HANDLING)
def update_transaction(db: Session, transaction_id, data):
    transaction = db.query(Transaction).filter_by(id=transaction_id).first()

    if not transaction:
        return None

    # 🚨 Conflict Detection
    if detect_conflict(data.updated_at, transaction.updated_at):
        return {
            "conflict": True,
            "message": "This record was updated by another user"
        }

    # ✅ Update fields dynamically
    for key, value in data.dict(exclude_unset=True).items():
        setattr(transaction, key, value)

    db.commit()
    db.refresh(transaction)

    # 🔥 Broadcast update event
    asyncio.create_task(event_manager.broadcast({
        "type": "updated",
        "id": str(transaction.id)
    }))

    return transaction