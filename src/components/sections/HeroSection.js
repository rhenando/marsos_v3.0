// src/components/HeroSection.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <section
      className='bg-light py-5 text-center'
      style={{ marginTop: "120px" }} // Adjust based on the height of your navbars
    >
      <Container>
        <Row className='align-items-center'>
          <Col md={6}>
            <h1>Welcome to YourBrand</h1>
            <p className='lead'>
              Discover our unique collection of products tailored to meet your
              needs.
            </p>
            <Button
              variant='primary'
              size='lg'
              href='#catalog'
              style={{ backgroundColor: "#2c6449", borderColor: "#2c6449" }}
            >
              Explore Catalog
            </Button>
          </Col>
          <Col md={6}>
            <img
              src='https://via.placeholder.com/500x300'
              alt='Main feature of YourBrand'
              className='img-fluid'
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
