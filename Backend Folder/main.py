#Mahika Bagri
#February 17 2026

from datetime import date, timedelta, datetime
from sqlalchemy import Column, Integer, String, Boolean, Sequence, create_engine
from sqlalchemy.orm import sessionmaker, relationship, declarative_base, Session
from fastapi import FastAPI, HTTPException, APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from passlib.hash import argon2 
from passlib.context import CryptContext
from jose import jwt, JWTError
from typing import Optional
from something import SECRET_KEY, ALGORITHM, TOKEN_EXPIRES

engine = create_engine('sqlite:///orm.db')

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

app = FastAPI()

scheme = OAuth2PasswordBearer(tokenUrl = "token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] 

def create_token(data:dict, expires_delta: Optional[timedelta] = None):
    copy = data.copy()

    if expires_delta:
        expires = datetime.utcnow() + expires_delta
    else:
        expires = datetime.utcnow() + expires_delta(hours=TOKEN_EXPIRES) 
    copy.update({"exp":expires})

    en_jwt = jwt.encode(copy, SECRET_KEY, algorithm = ALGORITHM)
    return en_jwt

def verify_token(token:str) -> TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms = [ALGORITHM])
        username: str = payload.get("sub")
        if  username is None:
            raise HTTPException(status_code=401)
        return TokenData(username = username)
    except jwt.JWTError:
        raise HTTPException(status_code=401)
    
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_sequence'), primary_key = True)
    username = Column(String(50), nullable = False)
    password = Column(String(20), nullable = False)
    professor = Column(Boolean)

    @classmethod
    def check_input(cls, db, username, password):
        if not username:
            raise ValueError("The username cannot be empty.")
        if not password:
            raise ValueError("The password cannot be empty.")
        if(db.query(User).filter(User.username == username).exists()):
            raise ValueError("Username taken; Please try another.")
        if(password.contains('\'') or password.contains('\"') or 
           password.contains(';') or password.contains('--') or
           password.contains('*') or password.contains('\\') or 
           password.contains('/') or password.contains('=') or 
           password.contains('<') or password.contains('>')):
            raise ValueError("Password cannot contain \', \", ;, --, *, \\, /, =, <, >")
        
        @classmethod
        def add(cls, db, username, password, professor):
            db.add(User(username, password, professor))
            db.commit()

        @classmethod
        def check_password(cls, db, username, password):
            user = db.query(User).filter(User.username == username).first()
            if not argon2.verify(password,user.password):
                user = False
                raise HTTPException(status_code=401)
            return user

class UserPy(BaseModel):
    username: str
    password: str
    professor: bool

def get_user(token:str = Depends(scheme), db: Session = Depends(get_db)):
    token_data = verify_token(token) 
    user = db.query(User).filter(User.username == token_data.username).first()
    if user is None:
            raise HTTPException(status_code=401)
    return user

def get_active(curr_user: User = Depends(get_user)):
    if not curr_user.is_active:
            raise HTTPException(status_code=404)
    return curr_user

@app.post("/user")
def add(user: UserPy, db: Session = Depends(get_db)):
    try:
        User.check_input(user.username, user.password, db)
    except ValueError as error:
        raise HTTPException(status_code = 400, detail = str(error))
    
    User.add(db, user.username, user.password, True)
    return {"status": "user created"}

class Login(BaseModel):
    username: str
    password: str

@app.post("/token", response_model = Token)
def verify(login: Login, db: Session = Depends(get_db)):
    try:
        user = User.check_password(login.username, login.password, db)
    except ValueError as error:
        raise HTTPException(status_code = 401, detail = str(error))
    if not user.is_active:
        raise HTTPException(status_code = 404)
    
    token_expires = timedelta(hours = TOKEN_EXPIRES)
    token = create_token(data = {"sub":user.username}, expires_delta = token_expires)

    return {"access_token": token, "token_type": "bearer"}

Base.metadata.create_all(bind=engine)