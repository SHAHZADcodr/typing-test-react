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

  const wordId = useRef(0);
  const pop = new Audio(popSound);
  const bgMusic = useRef(new Audio(bgMusicFile));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();

    if (bgMusicPlaying) {
      bgMusic.current.loop = true;
      bgMusic.current.play();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
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
        const updated = prevWords.map((word) => ({ ...word, top: word.top + 2 }));
        const filtered = updated.filter((word) => {
          if (word.top >= 90) {
            setMissed((m) => m + 1);
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
    setTyped(input);

    if (input.endsWith(' ')) {
      const trimmedInput = input.trim();
      const found = words.find((w) => w.text === trimmedInput);

      if (found) {
        pop.play();
        setScore((s) => s + 1);
        highlightAndRemove(found.id, 'green');
      } else {
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
    bgMusic.current.pause();
    bgMusic.current.currentTime = 0;

    setTimeout(() => {
      const total = score + missed;
      const accuracy = total === 0 ? 0 : Math.round((score / total) * 100);
      const wpm = Math.round(score / (duration / 60));

      const result = { score, missed, accuracy, wpm, total };

      console.log('Saving result to localStorage:', result);
      localStorage.setItem('gameResult', JSON.stringify(result));

      navigate('/gameover');
    }, 100);
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
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Game Tip</strong>
        </Toast.Header>
        <Toast.Body>You have to press space after typing every word!</Toast.Body>
      </Toast>

      <div className="top-bar d-flex justify-content-between">
        <div>
          <h5>⏱ Time Left: {timeLeft}s</h5>
          <h5>✅ Score: {score}</h5>
          <h5>❌ Missed: {missed}</h5>
        </div>
        <Button variant={bgMusicPlaying ? 'danger' : 'success'} onClick={toggleBgMusic}>
          {bgMusicPlaying ? '🔇 Mute Music' : '🔊 Play Music'}
        </Button>
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
            ❌ End Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;