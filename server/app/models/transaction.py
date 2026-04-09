from sqlalchemy import Column, String, Numeric, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.core.database import Base
import uuid

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    amount = Column(Numeric, nullable=False)
    date = Column(TIMESTAMP, nullable=False)
    payee = Column(String, nullable=False)

    meta_data = Column("metadata", JSONB, default={})

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"))

    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)