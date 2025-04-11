import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../customCss/GameOver.css';

const GameOver = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { score, missed, accuracy, wpm, total } = state || {};

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
