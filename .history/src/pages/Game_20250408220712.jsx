import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import '../customCss/Game.css';
import popSound from '../assets/pop.mp3';

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
  const [gameOver, setGameOver] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState([]);

  const inputRef = useRef();
  const wordId = useRef(0);
  const pop = new Audio(popSound);

  const resetGame = () => {
    setWords([]);
    setTyped('');
    setTimeLeft(duration);
    setScore(0);
    setMissed(0);
    setGameOver(false);
    setHighlightedWords([]);
  };

  // Timer countdown
  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
      if (timeLeft <= 0) endGame();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  // Word drop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const randomWord = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
      const newWord = {
        id: wordId.current++,
        text: randomWord,
        top: 0,
        left: Math.random() * 80 + 10,
        color: 'default',
      };
      setWords((prev) => [...prev, newWord]);
    }, 1500);
    return () => clearInterval(interval);
  }, [difficulty, gameOver]);

  // Falling animation
  useEffect(() => {
    if (gameOver) return;
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
  }, [gameOver]);

  // Typing check
  const handleTyping = (e) => {
    const input = e.target.value;
    setTyped(input);
    const foundWord = words.find((w) => w.text === input.trim());

    if (foundWord) {
      pop.play();
      setScore((s) => s + 1);
      highlightAndRemove(foundWord.id, 'green');
      setTyped('');
    } else if (input.trim().length > 0) {
      const wrongWord = {
        id: wordId.current++,
        text: input.trim(),
        top: 10,
        left: 40,
        color: 'red',
      };
      setWords((prev) => [...prev, wrongWord]);
      setTimeout(() => {
        setWords((prev) => prev.filter((w) => w.id !== wrongWord.id));
      }, 500);
      setTyped('');
    }
  };

  const highlightAndRemove = (id, color) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, color } : w))
    );
    setTimeout(() => {
      setWords((prev) => prev.filter((w) => w.id !== id));
    }, 300);
  };

  const endGame = () => {
    setGameOver(true);
  };

  const handleContinue = () => {
    resetGame();
  };

  const handleExit = () => {
    navigate('/');
  };

  const accuracy = score + missed === 0 ? 0 : Math.round((score / (score + missed)) * 100);
  const wpm = Math.round((score / (duration / 60)));

  return (
    <Container fluid className="game-container">
      {!gameOver ? (
        <>
          <div className="top-bar">
            <h5>⏱ Time Left: {timeLeft}s</h5>
            <h5>✅ Score: {score}</h5>
            <h5>❌ Missed: {missed}</h5>
          </div>

          <div className="falling-area">
            {words.map((word) => (
              <div
                key={word.id}
                className={`falling-word ${word.color}`}
                style={{ top: `${word.top}%`, left: `${word.left}%` }}
              >
                {word.text}
              </div>
            ))}
          </div>

          <Row className="mt-3">
            <Col xs={9}>
              <input
                type="text"
                className="typing-input"
                value={typed}
                onChange={handleTyping}
                autoFocus
                ref={inputRef}
                placeholder="Start typing..."
              />
            </Col>
            <Col xs={3}>
              <Button onClick={endGame} className="w-100">End Game</Button>
            </Col>
          </Row>
        </>
      ) : (
        <Card className="p-4 text-center mx-auto mt-5" style={{ maxWidth: '500px' }}>
          <h2 className="text-danger">Game Over 🛑</h2>
          <h4 className="mb-3">📊 Your Score</h4>
          <p><strong>WPM:</strong> {wpm}</p>
          <p><strong>Accuracy:</strong> {accuracy}%</p>
          <p><strong>Correct:</strong> {score}</p>
          <p><strong>Missed:</strong> {missed}</p>
          <p><strong>Total:</strong> {score + missed}</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="success" onClick={handleContinue}>🔁 Continue</Button>
            <Button variant="secondary" onClick={handleExit}>🏠 Exit</Button>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default Game;
