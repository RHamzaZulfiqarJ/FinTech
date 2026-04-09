from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
from app.models.organization import Organization

def signup(db: Session, email: str, password: str):

    existing = db.query(User).filter_by(email=email).first()
    if existing:
        raise Exception("User already exists")

    org = Organization(name=f"{email}'s Org")
    db.add(org)
    db.commit()
    db.refresh(org)
    user = User(
        email=email,
        password=hash_password(password),
        organization_id=org.id
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login(db: Session, email: str, password: str):
    user = db.query(User).filter_by(email=email).first()

    if not user or not verify_password(password, user.password):
        raise Exception("Invalid credentials")

    token = create_access_token({
        "user_id": str(user.id),
        "organization_id": str(user.organization_id)
    })

    return token