from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import QuizSubmission
from quiz_logic import analyze_quiz
from spotify import (
    get_auth_url,
    exchange_code_for_token,
    get_user_profile,
    create_playlist
)
from fastapi.responses import RedirectResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Persona.fm backend is alive 🎵"}

@app.post("/analyze")
def analyze(data: QuizSubmission):
    result = analyze_quiz(data.answers)
    return result

@app.get("/login")
def login():
    return RedirectResponse(get_auth_url())

@app.get("/callback")
def callback(code: str):
    token_data = exchange_code_for_token(code)

    access_token = token_data["access_token"]

    user = get_user_profile(access_token)
    user_id = user["id"]

    playlist = create_playlist(access_token, user_id)

    return playlist