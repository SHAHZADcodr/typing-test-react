// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In real case, you'd send the data to email or database
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow border-0 rounded-4">
        <h2 className="mb-4 text-center">Contact Us 📬</h2>
        {submitted ? (
          <Alert variant="success" className="text-center">
            Thank you for reaching out! We'll get back to you soon 😊
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
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Your message" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default Contact;
