// src/pages/Contact.jsx
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import '../customCss/Contact.css';

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
      <Container className="mt-5 contact-container">
        <Card className="contact-card shadow border-0 rounded-4 text-center p-4">
          <h2 className="mb-4 text-glow">Contact Us 📬</h2>
          <p className="lead">
            Have any questions, feedback, or suggestions? We'd love to hear from you!
          </p>
          <p className="fs-5">
            📧 Email us at:<br />
            <strong>
              <a
                href="mailto:typetest.contact@gmail.com"
                className="contact-email-link"
              >
                typetest.contact@gmail.com
              </a>
            </strong>
          </p>

          <Button
            variant="info"
            href="mailto:typetest.contact@gmail.com"
            className="mt-3 w-50 mx-auto"
          >
            ✉️ Send Us an Email
          </Button>
        </Card>

        <footer className="contact-footer mt-5 text-center">
          <p>📧 Contact us at: <stron.@gmail.com</strong></p>
          <p>© {currentYear} Typing Speed Challenge</p>
        </footer>
      </Container>
  );
};

export default Contact;
