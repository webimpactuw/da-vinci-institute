import os
from datetime import datetime, timedelta
from typing import Optional
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.hash import argon2
from jose import jwt, JWTError
from pymongo import AsyncMongoClient
from beanie import Document, init_beanie

# --- ENVIRONMENT SETUP ---
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
TOKEN_EXPIRES = int(os.getenv("TOKEN_EXPIRES", 3600))
MONGO_URL = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")

# --- BEANIE DOCUMENT (Your DB Schema + Pydantic Model combined) ---
class User(Document):
    username: str
    password: str  # Will store the hashed password

    class Settings:
        name = "users"  # The MongoDB collection name

# --- FASTAPI LIFESPAN (Database Initialization) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncMongoClient(MONGO_URL)

    await init_beanie(database=client[DB_NAME], document_models=[User])
    yield
    # Clean up database connections here if necessary

app = FastAPI(lifespan=lifespan)

# --- SECURITY & CORS ---
scheme = OAuth2PasswordBearer(tokenUrl="token")

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

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

# --- JWT HELPER FUNCTIONS ---
def create_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(seconds=TOKEN_EXPIRES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    
    # Beanie query syntax is clean and readable:
    user = await User.find_one(User.username == username)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# --- API ENDPOINTS ---

@app.post("/user")
async def register_user(user_data: UserCreate):
    # 1. Check if user already exists using Beanie
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
    # Beanie provides an inherent async .insert() method on Document instances
    await new_user.insert()
    
    return {"status": "user created"}

@app.post("/token", response_model=TokenResponse)
async def login(login_data: LoginRequest):
    # 1. Find the user
    user = await User.find_one(User.username == login_data.username)
    
    # 2. Verify password
    if not user or not argon2.verify(login_data.password, user.password):
        raise HTTPException(status_code=401, detail="Username or password incorrect")
    
    # 3. Generate token
    token_expires = timedelta(seconds=TOKEN_EXPIRES)
    token = create_token(data={"sub": user.username}, expires_delta=token_expires)

    return {"access_token": token, "token_type": "bearer"}