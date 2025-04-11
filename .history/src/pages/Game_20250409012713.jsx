// Same imports
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import '../customCss/Game.css';
import popSound from '../assets/pop.mp3';
import bgMusicFile from '../assets/background.mp3';

const wordBank = {
  easy: ['cat', 'dog', 'sun', 'pen', 'cup'],
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
  const [gameEnded, setGameEnded] = useState(false); // ✅ Avoid duplicate ending

  const wordId = useRef(0);
  const pop = new Audio(popSound);
  const bgMusic = useRef(new Audio(bgMusicFile));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!gameEnded) {
            endGame(); // ✅ Make sure endGame is called before timer cleanup
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const word = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
      const newWord = {
        id: wordId.current++,
        text: word,
        top: 0,
        left: Math.random() * 80 + 10,
        color: 'default'
      };
      setWords((prev) => [...prev, newWord]);
    }, 1500);
    return () => clearInterval(interval);
  }, [difficulty]);

  useEffect(() => {
    const falling = setInterval(() => {
      setWords((prevWords) => {
        const updated = prevWords.map((word) => ({ ...word, top: word.top + 1 }));
        const filtered = updated.filter((word) => {
          if (word.top >= 90) {
            setMissed((m) => m + 1); // ✅ Only missed here
            return false;
          }
          return true;
        });
        return filtered;
      });
    }, 100);
    return () => clearInterval(falling);
  }, []);

  const handleTyping = (e) => {
    const input = e.target.value;

    // ✅ Start music only once
    if (bgMusicPlaying && bgMusic.current.paused) {
      bgMusic.current.loop = true;
      bgMusic.current.play().catch((err) => {
        console.error("Audio play error:", err);
      });
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
        // ✅ Do NOT count as missed here anymore
        const randomWord = words[0];
        if (randomWord) {
          highlightAndRemove(randomWord.id, 'red');
        }
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

    bgMusic.current.pause();
    bgMusic.current.currentTime = 0;

    const total = score + missed;
    const accuracy = total === 0 ? 0 : Math.round((score / total) * 100);
    const wpm = Math.round(score / (duration / 60));

    const result = { score, missed, accuracy, wpm, total };

    // ✅ Save and delay slightly before navigating
    localStorage.setItem('gameResult', JSON.stringify(result));

    setTimeout(() => {
      navigate('/gameover');
    }, 300); // Added delay to ensure save completes
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
          <strong className="me-auto">Game Tip</strong>
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
          />
        </Col>
        <Col xs={3}>
          <Button onClick={endGame} className="end-game-button">
            ❌ End T
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
