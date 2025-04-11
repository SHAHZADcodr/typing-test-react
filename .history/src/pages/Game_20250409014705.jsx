import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgSound from '../assets/bgSound.mp3';

const wordsList = ['hello', 'world', 'react', 'javascript', 'coding', 'speed', 'typing'];

const Game = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bgMusicPlaying, setBgMusicPlaying] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);

  const bgMusic = useRef(null);
  const endGameCalled = useRef(false);
  const navigate = useNavigate();
  const duration = 60;

  useEffect(() => {
    generateWord();
    bgMusic.current = new Audio(bgSound);
    bgMusic.current.loop = true;
    bgMusic.current.play();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && !endGameCalled.current) {
      endGameCalled.current = true;
      setTimeout(() => {
        endGame();
      }, 300);
    }
  }, [timeLeft]);

  const generateWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    setCurrentWord(wordsList[randomIndex]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.endsWith(' ')) {
      const trimmed = value.trim();
      if (trimmed === currentWord) {
        setScore(score + 1);
      } else {
        setMissed(missed + 1);
      }
      setInput('');
      generateWord();
    }
  };

  const endGame = () => {
    if (gameEnded) return;
    setGameEnded(true);
    endGameCalled.current = true;

    // Stop music
    bgMusic.current.pause();
    bgMusic.current.currentTime = 0;
    setBgMusicPlaying(false);

    const total = score + missed;
    const accuracy = total === 0 ? 0 : Math.round((score / total) * 100);
    const wpm = Math.round(score / (duration / 60));

    const result = { score, missed, accuracy, wpm, total };
    localStorage.setItem('gameResult', JSON.stringify(result));

    setTimeout(() => {
      navigate('/gameover');
    }, 300);
  };

  const handleEndClick = () => {
    if (!endGameCalled.current) {
      endGameCalled.current = true;
      endGame();
    }
  };

  return (
    <div className="game-container">
      <h1>Speed Typing Game</h1>
      <p>Time Left: {timeLeft}s</p>
      <p>Score: {score}</p>
      <p>Missed: {missed}</p>
      <h2>{currentWord}</h2>
      <input type="text" value={input} onChange={handleChange} autoFocus />
      <button onClick={handleEndClick}>End</button>
    </div>
  );
};

export default Game;
