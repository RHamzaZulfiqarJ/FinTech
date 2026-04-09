from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.audit_log import AuditLog
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/")
def get_logs(db: Session = Depends(get_db),
             user=Depends(get_current_user)):

    logs = db.query(AuditLog).all()

    return [
        {
            "transaction_id": str(l.transaction_id),
            "field": l.field,
            "old": l.old_value,
            "new": l.new_value,
            "time": l.created_at
        }
        for l in logs
    ]