from fastapi import FastAPI
from app.api.routes import transactions
from app.api.routes import stream
from app.models.organization import Organization
from app.models.transaction import Transaction
from app.models.ai_log import AIValidationLog
from app.core.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(stream.router)