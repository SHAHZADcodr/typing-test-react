// GameOver.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../customCss/'

const GameOver = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    return (
      <div className="gameover-container">
        <h3 className="gameover-title">No result data found 😕</h3>
        <button className="restart-button" onClick={() => navigate('/')}>
          🏠 Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="gameover-container">
      <h1 className="gameover-title">🎮 Game Over!</h1>
      <div className="stats-box">
        <h4>✅ Correct Words: <span>{result.score}</span></h4>
        <h4>❌ Missed Words: <span>{result.missed}</span></h4>
        <h4>📈 Accuracy: <span>{result.accuracy}%</span></h4>
        <h4>⌨️ Words Per Minute: <span>{result.wpm}</span></h4>
      </div>
      <button className="restart-button" onClick={() => navigate('/')}>
        🔁 Play Again
      </button>
    </div>
  );
};

export default GameOver;
