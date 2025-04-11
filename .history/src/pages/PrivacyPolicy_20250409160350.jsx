import React from 'react';
import { Container, Card } from 'react-bootstrap';
import '../customCss/privacy.css';

const PrivacyPolicy = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="privacy-container">
      <Container className="mt-5">
        <Card className="privacy-card shadow border-0 rounded-4 p-4">
          <h2 className="mb-4 text-glow text-center">Privacy Policy 🔒</h2>

          <p>
            <strong>Typing Speed Challenge</strong> is a simple, free web application that does not collect or store any personal user data.
          </p>

          <p>
            We do not ask for your name, email, or any personal information. There are no login or registration features, and all typing test results are processed only in your browser and never sent to a server.
          </p>

          <h5 className="mt-4">Third-Party Ads</h5>
          <p>
            This website uses <strong>Google AdSense</strong> to display advertisements. Google may use cookies or similar technologies to personalize ads based on your browsing behavior.
          </p>

          <p>
            Learn more about how Google uses your data here: <br />
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="privacy-link"
            >
              https://policies.google.com/technologies/ads
            </a>
          </p>

          <h5 className="mt-4">Contact</h5>
          <p>
            If you have any questions or concerns, feel free to contact us at:<br />
            📧 <strong>typetest.contact@gmail.com</strong>
          </p>

          <p className="mt-4 text-center text-muted">
            © {currentYear} Typing Speed Challenge. All rights reserved.
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
