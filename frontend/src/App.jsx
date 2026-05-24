import { useState } from "react";
import axios from "axios";

const questions = [
  {
    id: "q1",
    question: "What’s your emotional weather right now?",
    options: [
      { text: "Quiet heartbreak 🌧️", value: "heartbreak" },
      { text: "Butterflies ✨", value: "romantic" },
      { text: "Locked in ⚡", value: "focus" },
      { text: "Nostalgic haze 🍂", value: "nostalgic" }
    ]
  },
  {
    id: "q2",
    question: "Where are you listening from?",
    options: [
      { text: "2 AM in bed", value: "night" },
      { text: "Long drive", value: "drive" },
      { text: "Study desk", value: "study" },
      { text: "Train window", value: "travel" }
    ]
  },
  {
    id: "q3",
    question: "What language should hurt/heal you?",
    options: [
      { text: "Hindi", value: "hindi" },
      { text: "English", value: "english" },
      { text: "Mixed", value: "mixed" },
      { text: "Surprise me", value: "surprise" }
    ]
  },
  {
    id: "q4",
    question: "Pick your cinematic universe",
    options: [
      { text: "Tamasha", value: "tamasha" },
      { text: "La La Land", value: "lalaland" },
      { text: "Fight Club", value: "fightclub" },
      { text: "Before Sunrise", value: "beforesunrise" }
    ]
  },
  {
    id: "q5",
    question: "Pick an era",
    options: [
      { text: "Old Bollywood classics", value: "old" },
      { text: "2010s emotional bangers", value: "2010s" },
      { text: "Current hits", value: "current" },
      { text: "Timeless indie", value: "indie" }
    ]
  },
  {
    id: "q6",
    question: "What voice do you need?",
    options: [
      { text: "Soft and broken", value: "soft" },
      { text: "Dreamy romantic", value: "dreamy" },
      { text: "Aggressive hype", value: "hype" },
      { text: "Nostalgic comfort", value: "comfort" }
    ]
  },
  {
    id: "q7",
    question: "Texting them?",
    options: [
      { text: "Yes", value: "yes" },
      { text: "Typing then deleting", value: "delete" },
      { text: "Blocked them", value: "blocked" },
      { text: "Who?", value: "who" }
    ]
  },
  {
    id: "q8",
    question: "What should this playlist do?",
    options: [
      { text: "Destroy me", value: "destroy" },
      { text: "Heal me", value: "heal" },
      { text: "Lock me in", value: "lockin" },
      { text: "Make me feel alive", value: "alive" }
    ]
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    const updatedAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value
    };

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      analyzeMood(updatedAnswers);
    }
  };

  const analyzeMood = async (finalAnswers) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
        answers: finalAnswers
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (result) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.logo}>Persona.fm 🎧</h1>
          <h2 style={styles.resultTitle}>Your vibe:</h2>
          <h1 style={styles.archetype}>{result.archetype}</h1>
          <pre style={styles.scoreBox}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Persona.fm 🎧</h1>

        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        <p style={styles.counter}>
          Question {currentQuestion + 1} / {questions.length}
        </p>

        <h2 style={styles.question}>
          {questions[currentQuestion].question}
        </h2>

        <div style={styles.options}>
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.value}
              style={styles.button}
              onClick={() => handleAnswer(option.value)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, Arial, sans-serif",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "650px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
  },
  logo: {
    color: "#1DB954",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2.2rem"
  },
  progressTrack: {
    width: "100%",
    height: "10px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "12px"
  },
  progressFill: {
    height: "100%",
    background: "#1DB954",
    transition: "0.4s ease"
  },
  counter: {
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: "20px"
  },
  question: {
    color: "white",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "1.7rem"
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  button: {
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer"
  },
  resultTitle: {
    color: "#94a3b8",
    textAlign: "center"
  },
  archetype: {
    color: "white",
    textAlign: "center"
  },
  scoreBox: {
    marginTop: "20px",
    background: "rgba(0,0,0,0.3)",
    padding: "20px",
    borderRadius: "16px",
    color: "#cbd5e1"
  }
};

export default App;