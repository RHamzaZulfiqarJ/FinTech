from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.transaction import Transaction
from app.services.insight_service import generate_insights
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/")
def get_insights(db: Session = Depends(get_db),
                 user=Depends(get_current_user)):

    transactions = db.query(Transaction).filter(
        Transaction.organization_id == user["organization_id"]
    ).all()

    return generate_insights(transactions)