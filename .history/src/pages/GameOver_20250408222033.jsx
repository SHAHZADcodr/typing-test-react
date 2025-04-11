import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import '../customCss/GameOV.css';

const GameOver = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { score, missed, accuracy, wpm, total } = state || {};

  return (
    <Container className="text-center mt-5">
      <h2>🎉 Game Over 🎮</h2>
      <h4>Total Words: {total}</h4>
      <h4>✅ Correct: {score}</h4>
      <h4>❌ Missed: {missed}</h4>
      <h4>🎯 Accuracy: {accuracy}%</h4>
      <h4>📝 WPM: {wpm}</h4>
      <Button className="mt-3" onClick={() => navigate('/')}>
        🔁 Play Again
      </Button>
    </Container>
  );
};

export default GameOver;
