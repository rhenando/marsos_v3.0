// src/components/BuyerHome.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { db, auth } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const BuyerHome = () => {
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBuyerData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching buyer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerData();
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
            Welcome, {buyerData?.name || "Buyer"}!
          </h2>
          <p className='text-muted'>
            Here’s a quick overview of your account and some recommendations.
          </p>
        </Col>
      </Row>

      {/* Main Sections */}
      <Row className='w-100' style={{ maxWidth: "1200px" }}>
        {/* Featured Products / Categories */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Recommended for You
              </Card.Title>
              <Card.Text>
                Explore products based on your interests and recent activity.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                View Products
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Orders & Purchase History */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Your Orders
              </Card.Title>
              <Card.Text>
                View your recent purchases and track your current orders.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                Order History
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Wishlist */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Wishlist
              </Card.Title>
              <Card.Text>
                Access your saved items to revisit them at any time.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                View Wishlist
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Messages / Notifications */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Messages
              </Card.Title>
              <Card.Text>
                Check messages from suppliers and updates from your account.
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

        {/* Account Settings */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Account Settings
              </Card.Title>
              <Card.Text>
                Manage your profile, update payment options, and more.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
              >
                Manage Account
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Support */}
        <Col md={6} className='mb-4'>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title style={{ color: "#2d6a4f", fontWeight: "bold" }}>
                Help & Support
              </Card.Title>
              <Card.Text>
                Get help with any issues or reach out to our support team.
              </Card.Text>
              <Button
                variant='success'
                style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
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

export default BuyerHome;
