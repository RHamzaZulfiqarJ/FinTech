from fastapi import FastAPI
from app.api.routes import transactions
from app.api.routes import stream
from app.models.organization import Organization
from app.models.transaction import Transaction
from app.models.ai_log import AIValidationLog
from app.core.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth
from app.api.routes import anomaly
from app.api.routes import insights
from app.api.routes import audit
from app.core.database import Base, engine

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(anomaly.router, prefix="/anomalies", tags=["Anomalies"])
app.include_router(insights.router, prefix="/insights", tags=["Insights"])
app.include_router(audit.router, prefix="/audit", tags=["Audit"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(stream.router)