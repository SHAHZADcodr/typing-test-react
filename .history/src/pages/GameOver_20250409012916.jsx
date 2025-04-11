import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../customCss/GameOver.css';

const GameOver = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState({
    score: 0,
    missed: 0,
    accuracy: 0,
    wpm: 0,
    total: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('gameResult');
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('Loaded result from localStorage:', parsed);
      setResult(parsed);
    } else {
      console.warn('No gameResult found in localStorage');
    }
  }, []);

  // ✅ Correct destructuring from result state
  const { score, missed, accuracy, wpm, total } = result;

  return (
    <div className="gameover-container">
      <h1 className="gameover-title">🎉 Typing Over 🎮</h1>

      <div className="stats-box">
        <h4>Total Words: <span>{total}</span></h4>
        <h4>✅ Correct: <span>{score}</span></h4>
        <h4>❌ Missed: <span>{missed}</span></h4>
        <h4>🎯 Accuracy: <span>{accuracy}%</span></h4>
        <h4>📝 WPM: <span>{wpm}</span></h4>
      </div>

      <button className="restart-button" onClick={() => navigate('/')}>
        🔁 Play Again
      </button>
    </div>
  );
};

export default GameOver;
