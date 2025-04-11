// Game.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import '../customCss/Game.css';
import popSound from '../assets/pop.mp3';
import bgMusicFile from '../assets/background.mp3';

const wordBank = {
  easy: [],
  medium: ['apple', 'banana', 'pencil', 'camera', 'jungle'],
  hard: ['algorithm', 'symphony', 'hypothesis', 'university', 'revolution']
};

const Game = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { difficulty = 'easy', duration = 60 } = state || {};

  const [words, setWords] = useState([]);
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [showToast, setShowToast] = useState(true);
  const [bgMusicPlaying, setBgMusicPlaying] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);

  const wordId = useRef(0);
  const endGameCalled = useRef(false);
  const pop = new Audio(popSound);
  const bgMusic = useRef(new Audio(bgMusicFile));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();

    bgMusic.current.loop = true;
    bgMusic.current.play().catch(err => console.error('Music play error:', err));

    let timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // ✅ Watch timeLeft separately to trigger endGame
  useEffect(() => {
    if (timeLeft === 0 && !endGameCalled.current) {
      endGameCalled.current = true;
      endGame();
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameEnded) {
        const word = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
        const newWord = {
          id: wordId.current++,
          text: word,
          top: 0,
          left: Math.random() * 80 + 10,
          color: 'default'
        };
        setWords((prev) => [...prev, newWord]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [difficulty, gameEnded]);

  useEffect(() => {
    const falling = setInterval(() => {
      setWords((prevWords) => {
        const updated = prevWords.map((word) => ({ ...word, top: word.top + 1 }));
        const missedWords = updated.filter((word) => word.top >= 90);

        if (missedWords.length > 0) {
          setMissed((m) => m + missedWords.length);
        }

        return updated.filter((word) => word.top < 90);
      });
    }, 100);
    return () => clearInterval(falling);
  }, []);

  const handleTyping = (e) => {
    const input = e.target.value;

    if (bgMusicPlaying && bgMusic.current.paused) {
      bgMusic.current.loop = true;
      bgMusic.current.play().catch((err) => console.error('Audio play error:', err));
    }

    setTyped(input);

    if (input.endsWith(' ')) {
      const trimmedInput = input.trim();
      const found = words.find((w) => w.text === trimmedInput);

      if (found) {
        pop.play();
        setScore((s) => s + 1);
        highlightAndRemove(found.id, 'green');
      } else {
        setMissed((m) => m + 1);
        const randomWord = words[0];
        if (randomWord) highlightAndRemove(randomWord.id, 'red');
      }

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
    if (gameEnded) return;
    setGameEnded(true);
    endGameCalled.current = true;

    bgMusic.current.pause();
    bgMusic.current.currentTime = 0;
    setBgMusicPlaying(false);

    const total = score + missed;
    const accuracy = total === 0 ? 0 : Math.round((score / total) * 100);
    const wpm = Math.round(score / (duration / 60));

    const result = { score, missed, accuracy, wpm, total };

    setTimeout(() => {
      navigate('/gameover', { state: { result } });
    }, 100); // slight delay to ensure state updates
  };

  const toggleBgMusic = () => {
    if (bgMusicPlaying) {
      bgMusic.current.pause();
    } else {
      bgMusic.current.play();
    }
    setBgMusicPlaying(!bgMusicPlaying);
  };

  return (
    <Container fluid className="game-container">
      <Toast className="toast-message centered-toast" show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
        <Toast.Header>
          <strong className="me-auto">Typing Tip</strong>
        </Toast.Header>
        <Toast.Body>You have to press space after typing every word!</Toast.Body>
      </Toast>

      <div className="top-bar">
        <div className="top-item">⏱ Time Left: {timeLeft}s</div>
        <div className="top-item">✅ Score: {score}</div>
        <div className="top-item">❌ Missed: {missed}</div>
        <div className="top-item">
          <Button variant={bgMusicPlaying ? 'danger' : 'success'} onClick={toggleBgMusic} className="music-toggle-button">
            {bgMusicPlaying ? '🔇 Mute Music' : '🔊 Play Music'}
          </Button>
        </div>
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

      <Row className="mt-3 align-items-center bottom-controls">
        <Col xs={9}>
          <input
            type="text"
            className="typing-input"
            value={typed}
            onChange={handleTyping}
            ref={inputRef}
            placeholder="Start typing..."
            disabled={gameEnded}
          />
        </Col>
        <Col xs={3}>
          <Button onClick={endGame} className="end-game-button">
            ❌ End Typing
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
