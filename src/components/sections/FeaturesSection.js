import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const FeaturesSection = () => {
  // Static data array for products
  const products = [
    {
      id: "1",
      category: "Construction",
      images: { mainImage: "./construction.webp" },
    },
    {
      id: "2",
      category: "Equipment",
      images: { mainImage: "/equipment.webp" },
    },
    {
      id: "3",
      category: "Plastic & Papers",
      images: { mainImage: "https://via.placeholder.com/150" },
    },
  ];

  return (
    <section
      id='features'
      className='py-5'
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Container>
        <h2
          className='text-center mb-5'
          style={{ color: "#333", fontWeight: "bold" }}
        >
          Browse Our Latest Product Categories
        </h2>
        <Row>
          {products.map((product) => (
            <Col
              md={4}
              className='d-flex justify-content-center mb-4'
              key={product.id}
            >
              <Card
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                }}
                className='shadow-sm'
              >
                <Card.Img
                  src={
                    product.images?.mainImage ||
                    "https://via.placeholder.com/150"
                  }
                  alt={product.category}
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    filter: "brightness(70%)",
                  }}
                />
                <Card.ImgOverlay
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Card.Title style={{ fontSize: "1.5rem" }}>
                    {product.category}
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
