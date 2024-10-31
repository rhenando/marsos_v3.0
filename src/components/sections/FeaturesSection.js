// src/components/FeaturesSection.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const FeaturesSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData.slice(0, 3)); // Limit to first 3 items
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id='features' className='py-5'>
      <Container>
        <h2 className='text-center mb-4'>Product Category</h2>
        <Row>
          {products.map((product) => (
            <Col
              md={4}
              className='d-flex justify-content-center mb-4'
              key={product.id}
            >
              <Card style={{ width: "24rem" }}>
                {" "}
                {/* Increased card width */}
                <Card.Img
                  variant='top'
                  src={
                    product.images?.mainImage ||
                    "https://via.placeholder.com/150"
                  }
                  alt={product.category}
                  className='img-fluid'
                  style={{ maxHeight: "300px", objectFit: "cover" }} // Increased image height
                />
                <Card.Body className='text-center'>
                  {" "}
                  {/* Center align label */}
                  <Card.Title>{product.category}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
