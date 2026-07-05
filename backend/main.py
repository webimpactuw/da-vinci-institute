import os
from datetime import datetime, timedelta
from typing import Any, Dict, Optional
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException, Depends, Header, Response, Cookie
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.hash import argon2
from jose import jwt, JWTError
from pymongo import AsyncMongoClient
from beanie import Document, Indexed, init_beanie

# --- ENVIRONMENT SETUP ---
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
TOKEN_EXPIRES = int(os.getenv("TOKEN_EXPIRES", 3600))
MONGO_URL = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"

# --- BEANIE DOCUMENT ---
class User(Document):
    username: Indexed(str, unique=True)
    password: str  # Will store the hashed password

    class Settings:
        name = "users"  # The MongoDB collection name

class CourseProgress(Document):
    user_id: Indexed(str)
    course_id: Indexed(str)
    last_completed_slide: int
    is_completed: bool = False

    class Settings:
        name = "course_progress"  # The MongoDB collection name

# --- FASTAPI LIFESPAN ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncMongoClient(MONGO_URL)

    await init_beanie(database=client[DB_NAME], document_models=[User, CourseProgress])
    yield

app = FastAPI(lifespan=lifespan)

# --- SECURITY & CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SCHEMAS FOR REQUESTS/RESPONSES ---
class UserCreate(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class CourseProgressRequest(BaseModel):
    course_id: str
    last_completed_slide: int
    is_completed: bool

# Token is now delivered via HttpOnly cookie; no access_token returned in JSON

# --- JWT HELPER FUNCTIONS ---
def create_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(seconds=TOKEN_EXPIRES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: Optional[str] = Cookie(default=None)):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token credentials")
      
        user = await User.find_one(User.username == username)
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")


# --- API ENDPOINTS ---
@app.post("/user")
async def register_user(user_data: UserCreate, response: Response):
    # Check if user already exists using Beanie
    existing_user = await User.find_one(User.username == user_data.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    if len(user_data.username) < 3:
        raise HTTPException(status_code=400, detail="Username must be at least 3 characters long")

    if len(user_data.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

    new_user = User(
        username=user_data.username,
        password=argon2.hash(user_data.password)
    )
    await new_user.insert()

    # create token and set HttpOnly cookie
    token_expires = timedelta(seconds=TOKEN_EXPIRES)
    token = create_token(data={"sub": new_user.username}, expires_delta=token_expires)
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="none",
        max_age=TOKEN_EXPIRES,
        path="/",
    )

    return {"status": "user created"}

@app.post("/token")
async def login(login_data: LoginRequest, response: Response):
    # Find the user
    user = await User.find_one(User.username == login_data.username)
    
    # Verify password
    if not user or not argon2.verify(login_data.password, user.password):
        raise HTTPException(status_code=401, detail="Username or password incorrect")
    
    # Generate token
    token_expires = timedelta(seconds=TOKEN_EXPIRES)
    token = create_token(data={"sub": user.username}, expires_delta=token_expires)

    # set HttpOnly cookie
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="none",
        max_age=TOKEN_EXPIRES,
        path="/",
    )

    return {"status": "logged in"}


@app.get("/user/me")
async def me(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}


@app.post("/logout")
async def logout(response: Response):
    # Clear the token cookie
    response.delete_cookie(key="token", path="/")
    return {"status": "logged out"}


@app.post("/course_progress")
async def create_or_update_course_progress(
    CourseProgressRequest: CourseProgressRequest,
    current_user: User = Depends(get_current_user),
):
    course_id = CourseProgressRequest.course_id
    last_completed_slide = CourseProgressRequest.last_completed_slide
    is_completed = CourseProgressRequest.is_completed
    
    existing_progress = await CourseProgress.find_one(
        (CourseProgress.user_id == current_user.username), (CourseProgress.course_id == course_id)
    )
    
    if existing_progress:
        # Update the latest slide number if it's greater than the current one
        if last_completed_slide > existing_progress.last_completed_slide:
            existing_progress.last_completed_slide = last_completed_slide
            existing_progress.is_completed = is_completed
            await existing_progress.save()
            return {"status": "course progress updated"}
        else:
            return {"status": "no update needed, latest slide number is not greater"}
    else:
        # Create a new course progress entry
        new_progress = CourseProgress(
            user_id=current_user.username,
            course_id=course_id,
            last_completed_slide=last_completed_slide,
            is_completed=is_completed
        )
        await new_progress.insert()
        return {"status": "course progress created"}
    
@app.get("/course_progress")
async def get_all_user_progress(current_user: User = Depends(get_current_user)) -> Dict[str, Any]:
    user_progress = await CourseProgress.find(CourseProgress.user_id == current_user.username).to_list()
    
    progress_map = {
        prog.course_id: {
            "last_completed_slide": prog.last_completed_slide,
            "is_completed": prog.is_completed
        }
        for prog in user_progress
    }
    
    return progress_map