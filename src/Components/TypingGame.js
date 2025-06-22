import React, { useState, useEffect } from "react";
import "./TypingGame.css";

const words = [
  "hello",
  "world",
  "react",
  "typing",
  "game",
  "fun",
  "code",
  "keyboard",
  "philosophy",

  "extraordinary",

  "architecture",

  "resilience",

  "cooperation",

  "picturesque",

  "functionality",

  "improvisation",

  "transcendence",

  "paradoxical",
];

export default function TypingGame() {
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (val === word) {
      setScore(score + 1);
      setWord(words[Math.floor(Math.random() * words.length)]);
      setInput("");
    }
  };

  return (
    <div className="typing-game">
      <h2>⌨️ Typing Game</h2>

      {gameOver ? (
        <div>
          <h3>Game Over!</h3>
          <p className="score-display">Score: {score}</p>
          <button
            className="restart-button"
            onClick={() => {
              setTimeLeft(30);
              setScore(0);
              setInput("");
              setWord(words[Math.floor(Math.random() * words.length)]);
              setGameOver(false);
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <>
          <p>Time left: {timeLeft}s</p>
          <h3 className="word-display">{word}</h3>
          <input
            className="typing-input"
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Type the word"
            autoFocus
          />
          <p className="score-display">Score: {score}</p>

          <select
            className="difficulty-select"
            onChange={(e) => {
              const selected = e.target.value;
              if (selected === "easy") setTimeLeft(60);
              if (selected === "medium") setTimeLeft(30);
              if (selected === "hard") setTimeLeft(15);
            }}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>
        </>
      )}
    </div>
  );
}
