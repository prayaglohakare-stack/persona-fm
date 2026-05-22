import { useState } from "react";
import axios from "axios";

function App() {
  const [result, setResult] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const analyzeMood = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
     answers: {
      q1: selectedAnswer
      }
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Persona.fm 🎧</h1>

      <h2>It’s 2 AM. Why are you awake?</h2>

<button onClick={() => setSelectedAnswer("A")}>
  Overthinking someone
</button>

<button onClick={() => setSelectedAnswer("B")}>
  Nostalgia hit
</button>

<button onClick={() => setSelectedAnswer("C")}>
  Locked in working
</button>

<button onClick={() => setSelectedAnswer("D")}>
  Thinking about love
</button>

<br /><br />

<button onClick={analyzeMood}>
  Analyze My Mood
</button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Your vibe: {result.archetype}</h2>
          <pre>{JSON.stringify(result.scores, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;