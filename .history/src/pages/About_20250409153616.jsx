import React from 'react';
import { Container, Card } from 'react-bootstrap';
import '../customCss/About.css'; // Make sure the path is correct

const About = () => {
  return (
    <Container className="about-container">
      <Card className="about-card">
        <h2 className="mb-3 text-center">About This Website </h2>
        <p>
          Welcome to our free <strong>Typing Test</strong> website! This platform is built to help you practice typing, improve your speed, and track your progress over time.
        </p>
        <p>It’s completely open for anyone — students, professionals, and typing enthusiasts — who want to practice and measure their typing speed in a distraction-free environment.</p>
        
        <p className="text-muted text-center mt-4">Thanks for visiting! ❤️</p>
      </Card>
    </Container>
  );
};

export default About;
