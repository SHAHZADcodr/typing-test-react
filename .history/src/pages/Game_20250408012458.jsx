import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import '../came.css'; // custom styles here
import popSound from '../assets/pop.mp3'; // optional sound

const wordBank = {
  easy: ['cat', 'dog', 'sun', 'pen', 'cup'],
  medium: ['apple', 'banana', 'pencil', 'camera', 'jungle'],
  hard: ['algorithm', 'symphony', 'hypothesis', 'university', 'revolution']
};

const Game = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { difficulty, duration } = state || { difficulty: 'easy', duration: 60 };

  const [words, setWords] = useState([]);
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const inputRef = useRef();
  const gameRef = useRef();
  const wordId = useRef(0);

  const pop = new Audio(popSound);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Falling word generation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomWord = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
      const newWord = {
        id: wordId.current++,
        text: randomWord,
        top: 0,
        left: Math.random() * 80 + 10, // 10% to 90% position
      };
      setWords((prev) => [...prev, newWord]);
    }, 1500);
    return () => clearInterval(interval);
  }, [difficulty]);

  // Falling animation loop
  useEffect(() => {
    const falling = setInterval(() => {
      setWords((prev) => {
        const updated = prev.map((word) => ({
          ...word,
          top: word.top + 2,
        }));
        const remaining = updated.filter((word) => {
          if (word.top >= 90) {
            setMissed((m) => m + 1);
            return false;
          }
          return true;
        });
        return remaining;
      });
    }, 100);
    return () => clearInterval(falling);
  }, []);

  const handleTyping = (e) => {
    const input = e.target.value;
    setTyped(input);
    const foundWord = words.find((w) => w.text === input.trim());
    if (foundWord) {
      pop.play();
      setScore((s) => s + 1);
      setWords((prev) => prev.filter((w) => w.id !== foundWord.id));
      setTyped('');
    }
  };

  const endGame = () => {
    navigate('/gameover', {
      state: {
        totalWords: score + missed,
        correctWords: score,
        incorrectWords: missed,
        duration,
      },
    });
  };

  return (
    <Container fluid className="game-container" ref={gameRef}>
      <div className="top-bar">
        <h5>⏱ Time Left: {timeLeft}s</h5>
        <h5>✅ Score: {score}</h5>
        <h5>❌ Missed: {missed}</h5>
      </div>

      <div className="falling-area">
        {words.map((word) => (
          <div
            key={word.id}
            className="falling-word"
            style={{ top: `${word.top}%`, left: `${word.left}%` }}
          >
            {word.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        className="typing-input"
        value={typed}
        onChange={handleTyping}
        autoFocus
        ref={inputRef}
        placeholder="Start typing..."
      />

      <Button className="mt-3" onClick={endGame}>End Game</Button>
    </Container>
  );
};

export default Game;
