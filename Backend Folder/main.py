#Mahika Bagri
#January 27 2026

from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, Sequence, create_engine
from sqlalchemy.orm import sessionmaker, relationship, declarative_base
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

engine = create_engine('sqlite:///orm.db')

Session = sessionmaker(bind = engine)
session = Session()

Base = declarative_base()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_sequence'), primary_key = True)
    username = Column(String(50), nullable = False)
    password = Column(String(20), nullable = False)
    professor = Column(Boolean)

    @classmethod
    def check_input(cls, username, password):
        if not username:
            raise ValueError("The username cannot be empty.")
        if not password:
            raise ValueError("The password cannot be empty.")
        if(session.query(User).filter(User.username == username).exists()):
            raise ValueError("Username taken; Please try another.")
        if(password.contains('\'') or password.contains('\"') or 
           password.contains(';') or password.contains('--') or
           password.contains('*') or password.contains('\\') or 
           password.contains('/') or password.contains('=') or 
           password.contains('<') or password.contains('>')):
            raise ValueError("Password cannot contain \', \", ;, --, *, \\, /, =, <, >")
        
        @classmethod
        def add(cls, username, password, professor):
            session.add(User(username, password, professor))
            session.commit()

class UserPy(BaseModel):
    username: str
    password: str
    professor: bool

@app.post("/user")
def add(user: UserPy):
    try:
        User.check_input(user.username, user.password, user.professor)
    except ValueError as error:
        raise HTTPException(status_code = 400, detail = str(error))
    
    User.add(user.username, user.password, user.professor)
    return {"status": "user created"}

Base.metadata.create_all(bind=engine)