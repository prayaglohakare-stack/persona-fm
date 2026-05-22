import os
import requests
import secrets
import hashlib
import base64
from urllib.parse import urlencode
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

code_verifier = None


def generate_pkce():
    global code_verifier

    code_verifier = secrets.token_urlsafe(64)

    challenge = hashlib.sha256(code_verifier.encode()).digest()
    code_challenge = base64.urlsafe_b64encode(challenge).decode().rstrip("=")

    return code_challenge


def get_auth_url():
    code_challenge = generate_pkce()

    params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "redirect_uri": REDIRECT_URI,
        "scope": "playlist-modify-public playlist-modify-private",
        "code_challenge_method": "S256",
        "code_challenge": code_challenge,
    }

    return "https://accounts.spotify.com/authorize?" + urlencode(params)


def exchange_code_for_token(code):
    global code_verifier

    url = "https://accounts.spotify.com/api/token"

    data = {
        "client_id": CLIENT_ID,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "code_verifier": code_verifier,
    }

    response = requests.post(url, data=data)

    print("TOKEN STATUS:", response.status_code)
    print("TOKEN TEXT:", response.text)

    return response.json()


def get_user_profile(access_token):
    url = "https://api.spotify.com/v1/me"

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json"
    }

    response = requests.get(url, headers=headers)

    print("PROFILE STATUS:", response.status_code)
    print("PROFILE TEXT:", response.text)

    return response.json()


def create_playlist(access_token, user_id):
    url = f"https://api.spotify.com/v1/users/{user_id}/playlists"

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    data = {
        "name": "Persona.fm Test Playlist 🎧",
        "description": "Created by Persona.fm",
        "public": False
    }

    response = requests.post(url, headers=headers, json=data)

    print("PLAYLIST STATUS:", response.status_code)
    print("PLAYLIST TEXT:", response.text)

    return response.json()