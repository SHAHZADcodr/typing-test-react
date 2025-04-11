// src/pages/About.jsx
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-5">
      <Card className="shadow p-4 border-0 rounded-4">
        <h2 className="mb-3 text-center">About This Website 🧠</h2>
        <p>
          Welcome to the <strong>Typing Speed Test</strong> website! 🚀 This platform is built to help you practice typing, improve your speed, and track your progress over time.
        </p>
        <p>
          Whether you're preparing for exams, interviews, or just want to improve your general typing accuracy and speed — this is your free tool to level up your skills.
        </p>
        <p>
          Built using <strong>React.js</strong> and <strong>React-Bootstrap</strong> for fast, clean, and mobile-friendly performance.
        </p>
        <p className="text-muted text-center mt-4">Thanks for visiting! ❤️</p>
      </Card>
    </Container>
  );
};

export default About;
