// src/components/HomePage.js
import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { User } from "react-feather"; // Import Feather Icons' User icon

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <Navbar style={{ backgroundColor: "#2c6449" }} variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              src='/path/to/logo.png' // Update with your logo path
              alt='YourBrand Logo'
              style={{ width: "50px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='#home'>Home</Nav.Link>
              <Nav.Link href='#features'>Features</Nav.Link>
              <Nav.Link href='#catalog'>Catalog</Nav.Link>
              <Nav.Link href='#contact'>Contact</Nav.Link>
              <Nav.Link href='#account'>
                <User size={18} style={{ marginBottom: "3px" }} />{" "}
                {/* User icon */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className='bg-light py-5 text-center'>
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

      {/* Product Features Section */}
      <section id='features' className='py-5'>
        <Container>
          <h2 className='text-center mb-4'>Product Features</h2>
          <Row>
            <Col md={4} className='text-center'>
              <img
                src='https://via.placeholder.com/150'
                alt='Unique design feature'
                className='mb-3'
              />
              <h5>Feature One</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo.
              </p>
            </Col>
            <Col md={4} className='text-center'>
              <img
                src='https://via.placeholder.com/150'
                alt='High quality materials'
                className='mb-3'
              />
              <h5>Feature Two</h5>
              <p>
                Quisque vehicula justo sit amet eros fermentum, a ultricies
                lorem suscipit.
              </p>
            </Col>
            <Col md={4} className='text-center'>
              <img
                src='https://via.placeholder.com/150'
                alt='Long-lasting performance'
                className='mb-3'
              />
              <h5>Feature Three</h5>
              <p>
                Suspendisse potenti. Phasellus euismod nibh nec interdum cursus.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Product Catalog Section */}
      <section id='catalog' className='py-5 bg-light'>
        <Container>
          <h2 className='text-center mb-4'>Product Catalog</h2>
          <Row>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Col md={4} key={item} className='mb-4'>
                <Card>
                  <Card.Img
                    variant='top'
                    src='https://via.placeholder.com/300x200'
                    alt={`Product ${item}`}
                  />
                  <Card.Body>
                    <Card.Title>Product {item}</Card.Title>
                    <Card.Text>
                      Brief description of Product {item}. It offers great value
                      and quality.
                    </Card.Text>
                    <Button
                      variant='primary'
                      style={{
                        backgroundColor: "#2c6449",
                        borderColor: "#2c6449",
                      }}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
