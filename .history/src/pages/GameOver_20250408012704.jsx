// src/pages/GameOver.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const GameOver = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    totalWords,
    correctWords,
    incorrectWords,
    duration,
  } = state || {};

  const accuracy = Math.round((correctWords / totalWords) * 100);
  const wpm = Math.round((correctWords / (duration / 60)));

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5 text-center">
      <Card className="p-4 shadow-lg rounded-4">
        <h2 className="mb-3 text-danger">Game Over 🛑</h2>
        <h4 className="mb-2">📈 Your Results</h4>
        <p><strong>WPM:</strong> {wpm} words/minute</p>
        <p><strong>Accuracy:</strong> {accuracy}%</p>
        <p><strong>Correct Words:</strong> {correctWords}</p>
        <p><strong>Incorrect Words:</strong> {incorrectWords}</p>
        <p><strong>Total Typed:</strong> {totalWords}</p>

        <div className="mt-4">
          <Button variant="primary" onClick={handlePlayAgain} className="me-3">
            🔁 Play Again
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            🏠 Exit to Home
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default GameOver;
