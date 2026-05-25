import os
import requests
import base64
from urllib.parse import urlencode
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")


def get_auth_url():
    params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "redirect_uri": REDIRECT_URI,
        "scope": "playlist-modify-public playlist-modify-private playlist-read-private",
        "show_dialog": "true",
    }

    return "https://accounts.spotify.com/authorize?" + urlencode(params)


def exchange_code_for_token(code):
    url = "https://accounts.spotify.com/api/token"

    auth_string = f"{CLIENT_ID}:{CLIENT_SECRET}"
    auth_base64 = base64.b64encode(auth_string.encode()).decode()

    headers = {
        "Authorization": f"Basic {auth_base64}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }

    response = requests.post(url, headers=headers, data=data)

    token_json = response.json()

    print("TOKEN STATUS:", response.status_code)
    print("TOKEN TEXT:", response.text)

    return token_json


def get_user_profile(access_token):
    response = requests.get(
        "https://api.spotify.com/v1/me",
        headers={"Authorization": f"Bearer {access_token}"}
    )

    print("PROFILE STATUS:", response.status_code)
    print("PROFILE TEXT:", response.text)

    return response.json()


def create_playlist(access_token):
    response = requests.post(
        "https://api.spotify.com/v1/me/playlists",
        headers={"Authorization": f"Bearer {access_token}"},
        json={
            "name": "Persona.fm Playlist 🎧",
            "description": "Created by Persona.fm",
            "public": False
        }
    )

    print("PLAYLIST STATUS:", response.status_code)
    print("PLAYLIST TEXT:", response.text)

    return response.json()


def search_track(access_token, query):
    response = requests.get(
        "https://api.spotify.com/v1/search",
        headers={"Authorization": f"Bearer {access_token}"},
        params={
            "q": query,
            "type": "track",
            "limit": 1
        }
    )

    if response.status_code != 200:
        print("SEARCH FAILED:", query)
        print(response.text)
        return None

    tracks = response.json().get("tracks", {}).get("items", [])

    if not tracks:
        print("NO TRACK FOUND:", query)
        return None

    return tracks[0]["uri"]


def add_tracks_to_playlist(access_token, playlist_id, track_uris):
    response = requests.post(
        f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
        headers={"Authorization": f"Bearer {access_token}"},
        json={"uris": track_uris}
    )

    print("ADD TRACKS STATUS:", response.status_code)
    print("ADD TRACKS TEXT:", response.text)

    return response.json()