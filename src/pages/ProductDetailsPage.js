import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col, Badge } from "react-bootstrap";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currentUser, setIntendedRoute, token } = useAuth();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSecureFetch = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          "https://your-backend-api.com/secure-data",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Secure data:", data);
      } catch (error) {
        console.error("Error fetching secure data:", error);
      }
    };
    if (token) {
      handleSecureFetch();
    }
  }, [token]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched product data:", data);
          setProductData(data);
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
      setIntendedRoute(`/chat/${productId}`);
      navigate("/login");
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
                src={productData.mainImage || ""}
                alt={productData.productName || "Unnamed Product"}
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
                  {productData.productName || "Unnamed Product"}
                </Card.Title>
                <Card.Text className='text-muted mb-2'>
                  <Badge bg='secondary'>
                    {productData.category || "Uncategorized"}
                  </Badge>
                </Card.Text>

                <Card.Text style={{ fontSize: "1.2rem" }}>
                  <strong>Description:</strong>{" "}
                  {productData.description || "No description available"}
                </Card.Text>

                {/* Price Range Table */}
                <Card.Text style={{ fontSize: "1.2rem", marginTop: "15px" }}>
                  <strong>Price Range:</strong>
                  <table
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "5px" }}>
                          Quantity
                        </th>
                        <th style={{ textAlign: "left", padding: "5px" }}>
                          Price per Unit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.priceRanges &&
                      productData.priceRanges.length > 0 ? (
                        productData.priceRanges.map((range, index) => (
                          <tr
                            key={index}
                            style={{ borderBottom: "1px solid #ddd" }}
                          >
                            <td style={{ padding: "5px" }}>
                              {range.minQty} -{" "}
                              {range.maxQty === Infinity
                                ? "and above"
                                : range.maxQty}{" "}
                              pieces
                            </td>
                            <td style={{ padding: "5px" }}>
                              $
                              {!isNaN(parseFloat(range.price))
                                ? parseFloat(range.price).toFixed(2)
                                : "N/A"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan='2'
                            style={{ padding: "5px", textAlign: "center" }}
                          >
                            N/A
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card.Text>

                <Card.Text style={{ fontSize: "1.2rem" }}>
                  <strong>Stock:</strong>{" "}
                  {productData.stock > 0
                    ? `${productData.stock} available`
                    : "Out of stock"}
                </Card.Text>

                <Card.Text style={{ fontSize: "1.2rem" }}>
                  <strong>Supplier:</strong>{" "}
                  {productData.supplierName || "Unknown Supplier"}
                </Card.Text>

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
