import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [duration, setDuration] = useState(60);
  const navigate = useNavigate();

  const handleStart = () => {
    // send difficulty and duration as state
    navigate('/game', { state: { difficulty, duration } });
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg rounded-4">
        <h2 className="text-center mb-4">🔥 Typing Speed Challenge Game</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>🎯 Select Difficulty</Form.Label>
              <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>⏱️ Select Timer</Form.Label>
              <Form.Select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
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
          <Button size="lg" onClick={handleStart}>Start Typing Game 🚀</Button>
        </div>
      </Card>
    </Container>
  );
};

export default Home;
