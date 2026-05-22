def analyze_quiz(answers):
    scores = {
        "heartbreak": 0,
        "romantic": 0,
        "nostalgic": 0,
        "focus": 0,
    }

    if answers.get("q1") == "A":
        scores["heartbreak"] += 3
    elif answers.get("q1") == "B":
        scores["nostalgic"] += 3
    elif answers.get("q1") == "C":
        scores["focus"] += 3
    elif answers.get("q1") == "D":
        scores["romantic"] += 3

    top_mood = max(scores, key=scores.get)

    return {
        "archetype": top_mood,
        "scores": scores
    }