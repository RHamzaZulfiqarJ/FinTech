from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class AIValidationLog(Base):
    __tablename__ = "ai_validation_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transactions.id"))

    ai_output = Column(String)
    corrected_output = Column(String)
    error_reason = Column(String)

    created_at = Column(TIMESTAMP)