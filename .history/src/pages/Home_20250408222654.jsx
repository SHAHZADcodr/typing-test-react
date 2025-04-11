import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../customCss/Home.css'; // import this CSS file

const Home = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [duration, setDuration] = useState(60);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game', { state: { difficulty, duration } });
  };

  return (
    <div className="home-container">
      <Card className="home-card">
        <h2 className="text-center mb-4">🔥 Typing Speed Challenge Game</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="form-label">🎯 Select Difficulty</Form.Label>
              <Form.Select
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className="form-label">⏱️ Select Timer</Form.Label>
              <Form.Select
                className="form-select"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                <option value="60">1 Minute</option>
                <option value="120">2 Minutes</option>
                <option value="180">3 Minutes</option>
                <option value="300">5 Minutes</option>
                <option value="600">10 Minutes</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button className="start-button" size="lg" onClick={handleStart}>
            Start Typing Game 🚀
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
