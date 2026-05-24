import random

SONG_POOLS = {
    "heartbreak": {
        "hindi": [
            "Agar Tum Saath Ho Arijit Singh",
            "Channa Mereya Arijit Singh",
            "Phir Le Aaya Dil Arijit Singh",
            "O Bedardeya Arijit Singh",
            "Husn Anuv Jain",
            "Kasoor Prateek Kuhad",
            "Baarishein Anuv Jain",
            "Gul Anuv Jain",
            "Shaam Aisha",
            "Alag Aasmaan Anuv Jain",
            "Ranjha B Praak",
            "Kho Gaye Hum Kahan Jasleen Royal",
            "Tu Jaane Na Atif Aslam",
            "Agar Tum Mil Jao Shreya Ghoshal",
            "Main Dhoondne Ko Zamaane Mein Arijit Singh"
        ],
        "english": [
            "Glimpse of Us Joji",
            "The Night We Met Lord Huron",
            "Oceans & Engines NIKI",
            "Fourth of July Sufjan Stevens",
            "Liability Lorde",
            "Another Love Tom Odell",
            "Roslyn Bon Iver",
            "Heather Conan Gray",
            "All I Want Kodaline",
            "exile Taylor Swift",
            "Before You Go Lewis Capaldi",
            "Arcade Duncan Laurence",
            "Somebody Else The 1975",
            "Let Her Go Passenger",
            "I Love You So The Walters"
        ]
    },

    "romantic": {
        "hindi": [
            "Tum Se Hi Mohit Chauhan",
            "Iktara Kavita Seth",
            "Raabta Arijit Singh",
            "Nazm Nazm Arko",
            "Apna Bana Le Arijit Singh",
            "Hawayein Arijit Singh",
            "Jeene Laga Hoon Atif Aslam",
            "Tera Ban Jaunga Akhil Sachdeva",
            "Kaise Hua Vishal Mishra",
            "Raatan Lambiyan Jubin Nautiyal",
            "Kesariya Arijit Singh",
            "Pehla Nasha Udit Narayan",
            "Shayad Arijit Singh",
            "Main Rang Sharbaton Ka Atif Aslam",
            "Tum Mile Neeraj Shridhar"
        ],
        "english": [
            "Until I Found You Stephen Sanchez",
            "Yellow Coldplay",
            "Golden Hour JVKE",
            "Dandelions Ruth B",
            "Falling Like The Stars James Arthur",
            "Adore You Harry Styles",
            "Can't Help Falling In Love Elvis Presley",
            "Rewrite The Stars Zac Efron",
            "Photograph Ed Sheeran",
            "Lover Taylor Swift",
            "Night Changes One Direction",
            "Perfect Ed Sheeran",
            "Love Me Like You Do Ellie Goulding",
            "Just The Way You Are Bruno Mars",
            "Make You Mine PUBLIC"
        ]
    },

    "focus": {
        "hindi": [
            "Zinda Bhaag Milkha Bhaag",
            "Lakshya Title Track",
            "Kar Har Maidaan Fateh",
            "Apna Time Aayega",
            "Brothers Anthem",
            "Sultan Title Track",
            "Dangal Theme",
            "Chak De India",
            "Aarambh",
            "Sher Aaya Sher",
            "Bandeya Re Bandeya",
            "Ilahi",
            "Soorma Anthem",
            "Jeetenge Hum",
            "Roobaroo Rang De Basanti"
        ],
        "english": [
            "Lose Yourself Eminem",
            "Till I Collapse Eminem",
            "Remember The Name Fort Minor",
            "Hall of Fame The Script",
            "Legends Never Die Against The Current",
            "Enemy Imagine Dragons",
            "Believer Imagine Dragons",
            "Warriors Imagine Dragons",
            "Unstoppable Sia",
            "Stronger Kanye West",
            "POWER Kanye West",
            "Industry Baby Lil Nas X",
            "Whatever It Takes Imagine Dragons",
            "Centuries Fall Out Boy",
            "My Songs Know What You Did In The Dark Fall Out Boy"
        ]
    },

    "nostalgic": {
        "hindi": [
            "Kun Faya Kun Rockstar",
            "Safarnama Tamasha",
            "Kabira Yeh Jawaani Hai Deewani",
            "Phir Se Ud Chala Rockstar",
            "Yeh Dooriyan Love Aaj Kal",
            "Tu Jaane Na Atif Aslam",
            "Iktara Wake Up Sid",
            "Ilahi Arijit Singh",
            "Kho Gaye Hum Kahan Jasleen Royal",
            "Pee Loon Mohit Chauhan",
            "Dil Diyan Gallan Atif Aslam",
            "Tum Ho Rockstar",
            "Main Rang Sharbaton Ka",
            "Choo Lo The Local Train",
            "Aaoge Jab Tum"
        ],
        "english": [
            "Night Changes One Direction",
            "Sweater Weather The Neighbourhood",
            "Somewhere Only We Know Keane",
            "505 Arctic Monkeys",
            "Cigarette Daydreams Cage The Elephant",
            "Riptide Vance Joy",
            "Atlantis Seafret",
            "Youth Daughter",
            "The Night We Met Lord Huron",
            "Home Edward Sharpe",
            "Yellow Coldplay",
            "Let Her Go Passenger",
            "Fix You Coldplay",
            "Somebody Else The 1975",
            "Apocalypse Cigarettes After Sex"
        ]
    }
}


def analyze_quiz(answers):
    mood_map = {
        "heartbreak": "2 AM Heartbreak Poet",
        "romantic": "Hopeless Cinematic Romantic",
        "focus": "Locked-In Main Character",
        "nostalgic": "Time Traveler Dreamer",
    }

    mood = answers.get("q1", "nostalgic")
    language = answers.get("q3", "mixed")

    if language == "hindi":
        songs = random.sample(SONG_POOLS[mood]["hindi"], 10)

    elif language == "english":
        songs = random.sample(SONG_POOLS[mood]["english"], 10)

    else:
        hindi = random.sample(SONG_POOLS[mood]["hindi"], 5)
        english = random.sample(SONG_POOLS[mood]["english"], 5)
        songs = hindi + english
        random.shuffle(songs)

    return {
        "archetype": mood_map[mood],
        "songs": songs,
        "profile": answers
    }