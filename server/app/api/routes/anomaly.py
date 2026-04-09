from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.transaction import Transaction
from app.services.anomaly_service import detect_anomalies
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/")
def get_anomalies(db: Session = Depends(get_db),
                  user=Depends(get_current_user)):

    transactions = db.query(Transaction).filter(
        Transaction.organization_id == user["organization_id"]
    ).order_by(Transaction.date).all()

    return detect_anomalies(transactions)