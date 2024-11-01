import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundImage: `url('/path/to/your/background-image.jpg')`, // Replace with the actual path to the image
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "100px 0",
        position: "relative",
      }}
    >
      {/* Overlay to apply a green tint */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 64, 0, 0.7)", // Dark green overlay with transparency
          zIndex: 1,
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className='align-items-center'>
          <Col md={6} className='ms-auto text-end'>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
              Comfortable and Fast
            </h1>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              At Your Place
            </h2>
            <p style={{ fontSize: "1.2rem", marginTop: "1.5rem" }}>
              Because we care about you, we understand your needs and
              preferences. We bring you a platform that gathers all national
              products produced in the Kingdom of Saudi Arabia in one place.
            </p>
            <p style={{ fontSize: "1.2rem" }}>
              From family-owned factories to large-scale operations, all in one
              platform, with easy technology and convenient payment methods to
              support the Saudi economy and promote local industries.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
