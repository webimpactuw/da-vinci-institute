#Mahika Bagri
#June 6 2026

from datetime import date, timedelta, datetime
from sqlalchemy import Column, Integer, String, Boolean, Sequence, ForeignKey, UniqueConstraint, create_engine
from sqlalchemy.orm import sessionmaker, relationship, declarative_base, Session
from fastapi import FastAPI, HTTPException, APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from passlib.hash import argon2 
from passlib.context import CryptContext
from jose import jwt, JWTError
from typing import Optional, List
import string 
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"), override=True)
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
TOKEN_EXPIRES = int(os.getenv("TOKEN_EXPIRES", 3600))
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

app = FastAPI()

scheme = OAuth2PasswordBearer(tokenUrl = "token")

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
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
        expires = datetime.utcnow() + expires_delta(seconds=TOKEN_EXPIRES*360) 
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
    except JWTError:
        raise HTTPException(status_code=401)
    
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_sequence'), primary_key = True)
    username = Column(String(50), nullable = False, unique=True)
    password = Column(String(200), nullable = False)
    is_active = Column(Boolean, default=True)

    @classmethod
    def check_input(cls, db, username, password):
        if not username:
            raise ValueError("The username cannot be empty.")
        if not password:
            raise ValueError("The password cannot be empty.")
        if db.query(User).filter(User.username == username).first():
            raise ValueError("Please try another username.")
        if len(password) < 8:
            raise ValueError("The password cannot be shorter than 8 characters.")    
        if not any(character.isupper() for character in password):
            raise ValueError("The password must contain an uppercase letter.")    
        if not any(character.islower() for character in password):
            raise ValueError("The password must contain a lowercase letter.")    
        if not any(character.isdigit() for character in password):
            raise ValueError("The password must contain a digit.")    
        if not any(c in string.punctuation for c in password):
            raise ValueError("The password must contain a special character.")    
        
    @classmethod
    def add(cls, db, username, password):
            db.add(User(username, password))
            db.commit()

    @classmethod
    def check_password(cls, db, username, password):
        user = db.query(User).filter(User.username == username).first()
        if not user or not argon2.verify(password,user.password):
            raise HTTPException(status_code=401, detail="Username or password incorrect")
        
        return user

class UserPy(BaseModel):
    username: str
    password: str

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
        User.check_input(db, user.username, user.password)
    except ValueError as error:
        raise HTTPException(status_code = 400, detail = str(error))
    
    User.add(db, user.username, argon2.hash(user.password))
    return {"status": "user created"}

class Login(BaseModel):
    username: str
    password: str

@app.post("/token", response_model = Token)
def verify(login: Login, db: Session = Depends(get_db)):
    try:
        user = User.check_password(db, login.username, login.password)
    except ValueError as error:
        raise HTTPException(status_code = 401, detail = str(error))
    if not user.is_active:
        raise HTTPException(status_code = 404)
    
    token_expires = timedelta(hours = TOKEN_EXPIRES)
    token = create_token(data = {"sub":user.username}, expires_delta = token_expires)

    return {"access_token": token, "token_type": "bearer"}

# ── Course Progress ──────────────────────────────────────────────────────────

class CourseProgress(Base):
    """
    Stores how far through each slide (0–100) a user is for a given course.
    One row per (user, course_slug, slide_index).
    """
    __tablename__ = 'course_progress'
    __table_args__ = (
        UniqueConstraint('user_id', 'course_slug', 'slide_index', name='uq_progress'),
    )

    id          = Column(Integer, primary_key=True, autoincrement=True)
    user_id     = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    course_slug = Column(String(200), nullable=False)
    slide_index = Column(Integer, nullable=False)
    progress    = Column(Integer, default=0)   # 0–100

    user = relationship('User', backref='progress_entries')


# ── Quiz Attempts ─────────────────────────────────────────────────────────────

class QuizAttempt(Base):
    """
    Records the last quiz submission for a (user, course_slug, slide_index).
    Only the most recent attempt is kept (upsert pattern).
    """
    __tablename__ = 'quiz_attempts'
    __table_args__ = (
        UniqueConstraint('user_id', 'course_slug', 'slide_index', name='uq_quiz'),
    )

    id             = Column(Integer, primary_key=True, autoincrement=True)
    user_id        = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    course_slug    = Column(String(200), nullable=False)
    slide_index    = Column(Integer, nullable=False)
    selected_index = Column(Integer, nullable=False)  # index of chosen option
    is_correct     = Column(Boolean, nullable=False)
    submitted_at   = Column(String(50), nullable=False)  # ISO datetime string

    user = relationship('User', backref='quiz_attempts')


# ── Pydantic schemas ──────────────────────────────────────────────────────────

class SlideProgressIn(BaseModel):
    slide_index: int
    progress: int   # 0–100

class SlideProgressOut(BaseModel):
    slide_index: int
    progress: int

class CourseProgressOut(BaseModel):
    course_slug: str
    slides: List[SlideProgressOut]

class QuizSubmitIn(BaseModel):
    slide_index: int
    selected_index: int
    is_correct: bool

class QuizAttemptOut(BaseModel):
    slide_index: int
    selected_index: int
    is_correct: bool
    submitted_at: str


# ── Progress endpoints ────────────────────────────────────────────────────────

@app.get("/progress/{course_slug}", response_model=CourseProgressOut)
def get_progress(
    course_slug: str,
    current_user: User = Depends(get_active),
    db: Session = Depends(get_db),
):
    """Return all stored slide progress values for the current user + course."""
    rows = (
        db.query(CourseProgress)
        .filter(
            CourseProgress.user_id     == current_user.id,
            CourseProgress.course_slug == course_slug,
        )
        .all()
    )
    slides = [SlideProgressOut(slide_index=r.slide_index, progress=r.progress) for r in rows]
    return CourseProgressOut(course_slug=course_slug, slides=slides)


@app.post("/progress/{course_slug}", response_model=SlideProgressOut)
def upsert_progress(
    course_slug: str,
    body: SlideProgressIn,
    current_user: User = Depends(get_active),
    db: Session = Depends(get_db),
):
    """Create or update the progress for a single slide."""
    if not (0 <= body.progress <= 100):
        raise HTTPException(status_code=400, detail="Progress must be between 0 and 100.")

    row = (
        db.query(CourseProgress)
        .filter(
            CourseProgress.user_id     == current_user.id,
            CourseProgress.course_slug == course_slug,
            CourseProgress.slide_index == body.slide_index,
        )
        .first()
    )

    if row:
        row.progress = body.progress
    else:
        row = CourseProgress(
            user_id     = current_user.id,
            course_slug = course_slug,
            slide_index = body.slide_index,
            progress    = body.progress,
        )
        db.add(row)

    db.commit()
    db.refresh(row)
    return SlideProgressOut(slide_index=row.slide_index, progress=row.progress)


# ── Quiz endpoints ────────────────────────────────────────────────────────────

@app.get("/quiz/{course_slug}", response_model=List[QuizAttemptOut])
def get_quiz_attempts(
    course_slug: str,
    current_user: User = Depends(get_active),
    db: Session = Depends(get_db),
):
    """Return all saved quiz attempts for the current user + course."""
    rows = (
        db.query(QuizAttempt)
        .filter(
            QuizAttempt.user_id     == current_user.id,
            QuizAttempt.course_slug == course_slug,
        )
        .all()
    )
    return [
        QuizAttemptOut(
            slide_index    = r.slide_index,
            selected_index = r.selected_index,
            is_correct     = r.is_correct,
            submitted_at   = r.submitted_at,
        )
        for r in rows
    ]


@app.post("/quiz/{course_slug}", response_model=QuizAttemptOut)
def submit_quiz(
    course_slug: str,
    body: QuizSubmitIn,
    current_user: User = Depends(get_active),
    db: Session = Depends(get_db),
):
    """Save (or overwrite) a quiz attempt and automatically set slide progress to 100."""
    row = (
        db.query(QuizAttempt)
        .filter(
            QuizAttempt.user_id     == current_user.id,
            QuizAttempt.course_slug == course_slug,
            QuizAttempt.slide_index == body.slide_index,
        )
        .first()
    )

    now = datetime.utcnow().isoformat()

    if row:
        row.selected_index = body.selected_index
        row.is_correct     = body.is_correct
        row.submitted_at   = now
    else:
        row = QuizAttempt(
            user_id        = current_user.id,
            course_slug    = course_slug,
            slide_index    = body.slide_index,
            selected_index = body.selected_index,
            is_correct     = body.is_correct,
            submitted_at   = now,
        )
        db.add(row)

    # Automatically mark the quiz slide as complete (100%)
    progress_row = (
        db.query(CourseProgress)
        .filter(
            CourseProgress.user_id     == current_user.id,
            CourseProgress.course_slug == course_slug,
            CourseProgress.slide_index == body.slide_index,
        )
        .first()
    )
    if progress_row:
        progress_row.progress = 100
    else:
        db.add(CourseProgress(
            user_id     = current_user.id,
            course_slug = course_slug,
            slide_index = body.slide_index,
            progress    = 100,
        ))

    db.commit()
    db.refresh(row)
    return QuizAttemptOut(
        slide_index    = row.slide_index,
        selected_index = row.selected_index,
        is_correct     = row.is_correct,
        submitted_at   = row.submitted_at,
    )


Base.metadata.create_all(bind=engine)