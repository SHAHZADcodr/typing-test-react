import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const GameOver = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { score, missed, accuracy, wpm, total } = state || {};

  const handleContinue = () => {
    navigate('/game', { state: { difficulty: 'easy', duration: 60 } });
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <Card className="p-4 text-center mx-auto mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-danger">Game Over 🛑</h2>
      <h4 className="mb-3">📊 Your Score</h4>
      <p><strong>WPM:</strong> {wpm}</p>
      <p><strong>Accuracy:</strong> {accuracy}%</p>
      <p><strong>Correct:</strong> {score}</p>
      <p><strong>Missed:</strong> {missed}</p>
      <p><strong>Total:</strong> {total}</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button variant="success" onClick={handleContinue}>🔁 Continue</Button>
        <Button variant="secondary" onClick={handleExit}>🏠 Exit</Button>
      </div>
    </Card>
  );
};

export default GameOver;
