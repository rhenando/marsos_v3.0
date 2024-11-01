import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  Globe,
} from "react-feather"; // Import Feather icons

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2c6449",
        color: "#ffffff",
        padding: "2rem 0",
      }}
    >
      <Container>
        {/* Social Media and Contact Info */}
        <Row className='justify-content-center text-center'>
          <Col md={6}>
            {/* Social Media Icons */}
            <div className='d-flex justify-content-center mb-3'>
              <button
                className='mx-2'
                style={{
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Globe />{" "}
                {/* TikTok substitute as Feather Icons do not have a TikTok icon */}
              </button>
              <button
                className='mx-2'
                style={{
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Instagram />
              </button>
              <button
                className='mx-2'
                style={{
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Linkedin />
              </button>
              <button
                className='mx-2'
                style={{
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Twitter />
              </button>
            </div>

            {/* Contact Information */}
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              Saudi Arabia - Riyadh - Eastern Ring Road
            </p>
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              info@example.com <Mail />
            </p>
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              +966123456789 <Phone />
            </p>
          </Col>
        </Row>

        {/* Bottom Bar with Left and Right Alignment */}
        <Row
          className='justify-content-between mt-4'
          style={{ fontSize: "0.8rem", color: "#ffffff" }}
        >
          <Col md='auto'>
            <p style={{ marginBottom: "0.5rem" }}>
              Powered by{" "}
              <span
                style={{
                  backgroundColor: "#ffffff",
                  color: "#2c6449",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Marsos
              </span>{" "}
              - The #1 Cross Platform E-commerce Developer
            </p>
          </Col>
          <Col md='auto' className='text-md-end text-center'>
            <p style={{ marginBottom: "0.5rem" }}>
              All rights reserved © Your Company Name
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
