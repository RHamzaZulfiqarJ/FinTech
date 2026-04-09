from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class TransactionCreate(BaseModel):
    amount: float
    date: datetime
    payee: str
    meta_data: Optional[Dict] = {}
    organization_id: str

class TransactionUpdate(BaseModel):
    amount: Optional[float]
    payee: Optional[str]
    meta_data: Optional[Dict]
    updated_at: datetime  # IMPORTANT for conflict detection

class TransactionResponse(BaseModel):
    id: str
    amount: float
    payee: str
    meta_data: Dict

    class Config:
        from_attributes = True