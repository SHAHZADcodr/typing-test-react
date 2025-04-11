import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../customCss/GameOver.css';

const GameOver = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState({
    score: 0,
    missed: 0,
    accuracy: 0,
    wpm: 0,
    total: 0
  });

  useEffect(() => {
    if (state) {
      setResult(state);
      localStorage.setItem('gameResult', JSON.stringify(state));
    } else {
      const saved = localStorage.getItem('gameResult');
      if (saved) setResult(JSON.parse(saved));
    }
  }, [state]);

  const { score, missed, accuracy, wpm, total } = result;

  return (
    <div className="gameover-container">
      <h1 className="gameover-title">🎉 Game Over 🎮</h1>

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
