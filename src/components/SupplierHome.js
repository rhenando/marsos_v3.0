import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { db, auth } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const SupplierHome = () => {
  const [supplierData, setSupplierData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid); // Accessing from 'users' collection
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setSupplierData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center justify-content-center py-5'
      style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}
    >
      {/* Welcome Section */}
      <Row className='mb-4'>
        <Col>
          <h2 style={{ color: "#2d6a4f", fontWeight: "bold" }}>
            Welcome, {supplierData?.companyName || "Supplier"}!
          </h2>
          <p className='text-muted'>
            Here’s a quick overview of your supplier account and recent
            activities.
          </p>
        </Col>
      </Row>

      {/* Main Sections */}
      <Row className='w-100' style={{ maxWidth: "1200px" }}>
        {/* Business Profile */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Business Profile
              </Card.Title>
              <Card.Text>
                View and update your business information and contact details.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Product Listings */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Product Listings
              </Card.Title>
              <Card.Text>
                Manage your products, update stock, and add new listings.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
                onClick={() => navigate("/manage-listings")} // Navigate to Manage Listings
              >
                Manage Listings
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Requests */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Order Requests
              </Card.Title>
              <Card.Text>View and manage orders placed by buyers.</Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                Track Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Sales Insights */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Sales Insights
              </Card.Title>
              <Card.Text>
                Review your sales performance and best-selling products.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                View Insights
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Messages from Buyers */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Messages
              </Card.Title>
              <Card.Text>
                Communicate with buyers and check updates from your customers.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                View Messages
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Account Settings & Support */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Account Settings & Support
              </Card.Title>
              <Card.Text>
                Manage your account settings or reach out to support.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                Manage Account
              </Button>
              <Button
                variant='link'
                style={{ color: "#2d6a4f", paddingLeft: "10px" }}
              >
                Contact Support
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SupplierHome;
