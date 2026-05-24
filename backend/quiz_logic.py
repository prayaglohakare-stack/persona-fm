def analyze_quiz(answers):
    mood_map = {
        "heartbreak": "2 AM Heartbreak Poet",
        "romantic": "Hopeless Cinematic Romantic",
        "focus": "Locked-In Main Character",
        "nostalgic": "Time Traveler Dreamer",
    }

    primary_mood = answers.get("q1", "nostalgic")

    archetype = mood_map.get(primary_mood, "Time Traveler Dreamer")

    profile = {
        "archetype": archetype,
        "mood": primary_mood,
        "context": answers.get("q2"),
        "language": answers.get("q3"),
        "cinematic": answers.get("q4"),
        "era": answers.get("q5"),
        "voice": answers.get("q6"),
        "social": answers.get("q7"),
        "intent": answers.get("q8"),
    }

    return profile