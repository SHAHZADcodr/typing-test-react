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

  <h2 className="mb-3 text-center">Our Vision</h2>
  <p>To provide a free and open typing tool that contributes to digital skill development.</p>
         <p>We believe in keeping it simple, fast, and accessible. Your typing happens in your browser, and we never store your test results or personal information.</p>

        <p className="text-muted text-center mt-4">Thanks for visiting! ❤️</p>
      </Card>
    </Container>
  );
};

export default About;
