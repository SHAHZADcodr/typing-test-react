// GameOver.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const GameOver = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    return (
      <Container className="text-center mt-5">
        <h3>No result data found 😕</h3>
        <Button onClick={() => navigate('/')}>🏠 Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="text-center mt-5 gameover">
      <h1>🎮 Game Over!</h1>
      <h3>📊 Your Scorecard</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>✅ Correct Words: {result.score}</li>
        <li>❌ Missed Words: {result.missed}</li>
        <li>📈 Accuracy: {result.accuracy}%</li>
        <li>⌨️ Words Per Minute: {result.wpm}</li>
      </ul>
      <Button onClick={() => navigate('/')}>🔁 Play Again</Button>
    </Container>
  );
};

export default GameOver;
