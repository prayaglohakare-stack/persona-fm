import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "q1",
    question: "What’s your emotional weather right now?",
    options: [
      { text: "Quiet heartbreak 🌧️", value: "heartbreak", sub: "for nights that ache softly" },
      { text: "Butterflies ✨", value: "romantic", sub: "golden-hour feelings" },
      { text: "Locked in ⚡", value: "focus", sub: "main character productivity" },
      { text: "Nostalgic haze 🍂", value: "nostalgic", sub: "memories on loop" }
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
      { text: "Surprise me", value: "mixed" }
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

const descriptions = {
  heartbreak:
    "You romanticize unfinished conversations, rainy windows, and songs that hurt beautifully.",
  romantic:
    "You believe life should feel cinematic, golden-hour coded, and soundtrack-worthy.",
  focus:
    "Discipline, ambition, adrenaline. Your soundtrack pushes scenes forward.",
  nostalgic:
    "You collect memories like postcards and revisit emotions through melodies."
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [creating, setCreating] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = async (value) => {
    const updated = {
      ...answers,
      [questions[currentQuestion].id]: value
    };

    setAnswers(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const res = await axios.post("https://persona-fm.onrender.com/analyze", {
        answers: updated
      });

      setResult(res.data);
    }
  };

  const createPlaylist = () => {
  setCreating(true);
  window.location.href = "https://persona-fm.onrender.com/login";
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden text-white flex items-center justify-center px-4">
      <div className="absolute w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10" />
      <div className="absolute w-72 h-72 bg-sky-500/10 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2" />

      <div className="w-full max-w-3xl z-10">
        <AnimatePresence mode="wait">
          {creating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl"
            >
              <h1 className="text-4xl font-bold text-emerald-400 mb-6">Persona.fm 🎧</h1>
              <h2 className="text-3xl font-semibold mb-4">Building your soundtrack...</h2>
              <p className="text-slate-300">finding songs • opening spotify • cinematic magic</p>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl"
            >
              <h1 className="text-4xl font-bold text-emerald-400 text-center mb-6">Persona.fm 🎧</h1>

              <p className="text-center tracking-[0.3em] text-slate-400 text-sm mb-4">
                YOUR SOUNDTRACK IDENTITY
              </p>

              <h2 className="text-5xl font-bold text-center leading-tight mb-6">
                {result.archetype}
              </h2>

              <p className="text-center text-slate-300 max-w-2xl mx-auto leading-8 text-lg">
                {descriptions[result.profile.q1]}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <span className="px-4 py-2 rounded-full bg-white/10 text-sm">
                  🎬 {result.profile.q4}
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-sm">
                  🌍 {result.profile.q3}
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-sm">
                  💿 {result.profile.q5}
                </span>
              </div>

              <div className="mt-10 bg-black/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-5">Playlist Preview</h3>

                <div className="space-y-3">
                  {result.songs.slice(0, 5).map((song, i) => (
                    <div
                      key={i}
                      className="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3"
                    >
                      🎵 {song}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={createPlaylist}
                className="mt-8 w-full bg-emerald-500 hover:bg-emerald-400 transition duration-300 rounded-2xl py-5 text-lg font-bold shadow-lg hover:scale-[1.02]"
              >
                Open My Soundtrack 🎧
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl"
            >
              <h1 className="text-4xl font-bold text-center text-emerald-400 mb-8">
                Persona.fm 🎧
              </h1>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-center text-slate-400 mb-8">
                Question {currentQuestion + 1} / {questions.length}
              </p>

              <h2 className="text-4xl font-bold text-center leading-tight mb-10">
                {questions[currentQuestion].question}
              </h2>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="text-left bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 rounded-2xl p-6 border border-white/10"
                  >
                    <div className="text-lg font-semibold">{option.text}</div>
                    {option.sub && (
                      <div className="text-slate-400 text-sm mt-2">{option.sub}</div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}