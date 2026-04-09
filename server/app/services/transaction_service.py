from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.utils.conflict import detect_conflict
from app.services.event_manager import event_manager
from app.models.audit_log import AuditLog
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


def update_transaction(db, transaction_id, data, user):

    transaction = db.query(Transaction).filter_by(id=transaction_id).first()

    if not transaction:
        raise Exception("Transaction not found")

    changes = []

    # 🔹 Track changes
    for field in ["amount", "payee"]:
        old = getattr(transaction, field)
        new = getattr(data, field, old)

        if str(old) != str(new):
            changes.append((field, old, new))
            setattr(transaction, field, new)

    db.commit()
    db.refresh(transaction)

    # 🔹 Save audit logs
    for field, old, new in changes:
        log = AuditLog(
            transaction_id=transaction.id,
            user_id=user["user_id"],
            field=field,
            old_value=str(old),
            new_value=str(new)
        )
        db.add(log)

    db.commit()

    return transaction