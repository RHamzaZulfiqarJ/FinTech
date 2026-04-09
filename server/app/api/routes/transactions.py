from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.transaction import TransactionCreate, TransactionUpdate
from app.services.transaction_service import create_transaction, get_transactions, update_transaction

router = APIRouter()


@router.post("/")
def create(data: TransactionCreate, db: Session = Depends(get_db)):
    return create_transaction(db, data)


@router.get("/")
def read(db: Session = Depends(get_db)):
    return get_transactions(db)


@router.put("/{transaction_id}")
def update(transaction_id: str, data: TransactionUpdate, db: Session = Depends(get_db)):
    return update_transaction(db, transaction_id, data)