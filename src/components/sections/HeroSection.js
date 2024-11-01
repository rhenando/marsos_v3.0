import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundImage: `url('/banner.webp')`, // Replace with the actual path to your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "100px 0",
        position: "relative",
      }}
    >
      {/* Overlay to apply a green tint that matches the navbar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(44, 100, 73, 0.85)", // Matching navbar color with transparency
          zIndex: 1,
        }}
      ></div>

      <Container
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <Row className='justify-content-center'>
          <Col md={8}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
              Effortless Shopping, Right at Your Fingertips
            </h1>
            <p style={{ fontSize: "1.2rem", marginTop: "1.5rem" }}>
              We’re here to make your shopping experience as comfortable and
              seamless as possible. Discover a platform that unites the finest
              products from across the Kingdom of Saudi Arabia—all in one place.
            </p>
            <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
              From family-owned businesses to large-scale enterprises, we bring
              together a diverse range of locally-produced goods with
              user-friendly technology and convenient payment options,
              supporting the Saudi economy and celebrating local industries.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
