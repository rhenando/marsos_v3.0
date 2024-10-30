// src/pages/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col, Badge } from "react-bootstrap";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Ensure you have an AuthContext for auth state

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from URL params
  const navigate = useNavigate();
  const { currentUser, setIntendedRoute } = useAuth(); // Check if user is authenticated and set intended route
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProductData(docSnap.data());
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleContactSupplier = () => {
    if (currentUser) {
      navigate(`/chat/${productId}`, { state: { productData } });
    } else {
      setIntendedRoute(`/chat/${productId}`); // Set intended route to chat page
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  };

  if (loading) {
    return <Container className='py-5'>Loading product details...</Container>;
  }

  return (
    <Container className='py-5'>
      {productData ? (
        <Row className='justify-content-center'>
          {/* Product Image */}
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Img
                variant='top'
                src={productData.imageUrl}
                alt={productData.name}
              />
            </Card>
          </Col>

          {/* Product Details */}
          <Col md={6}>
            <Card className='shadow-sm'>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#2d6a4f",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {productData.name}
                </Card.Title>
                <Card.Text className='text-muted mb-2'>
                  <Badge bg='secondary'>{productData.category}</Badge>
                </Card.Text>

                <Card.Text style={{ fontSize: "1.2rem" }}>
                  <strong>Description:</strong> {productData.description}
                </Card.Text>

                <Card.Text style={{ fontSize: "1.2rem" }}>
                  <strong>Price:</strong> ${productData.price.toFixed(2)}
                </Card.Text>

                <Card.Text style={{ fontSize: "1.2rem" }}>
                  <strong>Stock:</strong>{" "}
                  {productData.stock > 0
                    ? `${productData.stock} available`
                    : "Out of stock"}
                </Card.Text>

                <Card.Text style={{ fontSize: "1.2rem" }}>
                  <strong>Supplier:</strong> {productData.supplierName}
                </Card.Text>

                {/* Contact Supplier Button */}
                <Button
                  variant='success'
                  onClick={handleContactSupplier}
                  style={{
                    backgroundColor: "#2d6a4f",
                    borderColor: "#2d6a4f",
                    marginTop: "15px",
                  }}
                >
                  Contact Supplier
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Product not found</p>
      )}
    </Container>
  );
};

export default ProductDetails;
