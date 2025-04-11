// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import '../customCss/Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <Container className="mt-5">
        <Card className="contact-card shadow border-0 rounded-4">
          <h2 className="mb-4 text-center text-glow">Contact Us 📬</h2>
          {submitted ? (
            <Alert variant="success" className="text-center mt-4">
              ✅ Thank you for reaching out! We'll get back to you soon 😊
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Your Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Type your message..." required />
              </Form.Group>

              <Button variant="info" type="submit" className="w-100">
                ✉️ Send Message
              </Button>
            </Form>
          )}
        </Card>
        <footer className="contact-footer mt-5 text-center">
          <p>📧 Contact us at: <strong>typetest.contact@gmail.com</strong></p>
          <p>© {currentYear} Typing Speed Challenge</p>
        </footer>
      </Container>
    </div>
  );
};

export default Contact;
