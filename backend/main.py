from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import QuizSubmission
from quiz_logic import analyze_quiz
from spotify import (
    get_auth_url,
    exchange_code_for_token,
    get_user_profile,
    create_playlist,
    search_track,
    add_tracks_to_playlist
)
from fastapi.responses import RedirectResponse

app = FastAPI()

latest_result = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://persona-fm-sable.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Persona.fm backend is alive 🎵"}


@app.post("/analyze")
def analyze(data: QuizSubmission):
    global latest_result

    result = analyze_quiz(data.answers)
    latest_result = result

    return result


@app.get("/login")
def login():
    return RedirectResponse(get_auth_url())


@app.get("/callback")
def callback(code: str):
    global latest_result

    token_data = exchange_code_for_token(code)
    access_token = token_data["access_token"]

    user = get_user_profile(access_token)

    playlist = create_playlist(access_token)
    playlist_id = playlist["id"]

    track_uris = []

    if latest_result:
        for song in latest_result["songs"]:
            uri = search_track(access_token, song)

            if uri:
                track_uris.append(uri)

    if track_uris:
        add_tracks_to_playlist(access_token, playlist_id, track_uris)

    playlist_url = playlist["external_urls"]["spotify"]
    return RedirectResponse(playlist_url)