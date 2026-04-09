from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.transaction import TransactionCreate, TransactionUpdate
from app.services.transaction_service import create_transaction, get_transactions, update_transaction
from app.core.deps import get_current_user
from app.models.transaction import Transaction

router = APIRouter()

@router.get("/")
def get_all(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
    search: str = Query(None),
    min_amount: float = Query(None),
    max_amount: float = Query(None),
    meta_key: str = Query(None),
    meta_value: str = Query(None),
    page: int = 1,
    limit: int = 10
):

    query = db.query(Transaction).filter(
        Transaction.organization_id == user["organization_id"]
    )

    # 🔍 Search by payee
    if search:
        query = query.filter(Transaction.payee.ilike(f"%{search}%"))

    # 💰 Amount filters
    if min_amount is not None:
        query = query.filter(Transaction.amount >= min_amount)

    if max_amount is not None:
        query = query.filter(Transaction.amount <= max_amount)

    # 🧠 JSONB FILTER (VERY IMPORTANT)
    if meta_key and meta_value:
        query = query.filter(
            Transaction.meta_data[meta_key].astext == meta_value
        )

    # 📄 Pagination
    offset = (page - 1) * limit
    results = query.offset(offset).limit(limit).all()

    return results

@router.post("/")
def create(data: TransactionCreate,
           db: Session = Depends(get_db),
           user=Depends(get_current_user)):

    data.organization_id = user["organization_id"]
    return create_transaction(db, data)


@router.get("/")
def read(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return get_transactions(db)


@router.put("/{id}")
def update(id: str,
           data: TransactionUpdate,
           db: Session = Depends(get_db),
           user=Depends(get_current_user)):

    return update_transaction(db, id, data, user)