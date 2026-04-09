from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import SignupRequest, LoginRequest, TokenResponse
from app.services.auth_service import signup, login

router = APIRouter()


@router.post("/signup", response_model=TokenResponse)
def signup_route(data: SignupRequest, db: Session = Depends(get_db)):
    user = signup(db, data.email, data.password)
    token = login(db, data.email, data.password)
    return {"access_token": token}


@router.post("/login", response_model=TokenResponse)
def login_route(data: LoginRequest, db: Session = Depends(get_db)):
    token = login(db, data.email, data.password)
    return {"access_token": token}