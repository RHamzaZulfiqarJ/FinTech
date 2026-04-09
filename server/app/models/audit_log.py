from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid
from datetime import datetime


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transactions.id"))
    user_id = Column(UUID(as_uuid=True))

    field = Column(String)
    old_value = Column(String)
    new_value = Column(String)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)