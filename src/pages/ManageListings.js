import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { db } from "../firebase.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        setListings(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "listings", id));
    setListings(listings.filter((listing) => listing.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Row className='mb-4'>
        <Col>
          <h2>Manage Product Listings</h2>
          <p>Update, add, or remove products from your catalog.</p>
          <Button variant='success' onClick={() => navigate("/add-product")}>
            Add New Listing
          </Button>{" "}
          {/* Navigate to Add Product */}
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id}>
                  <td>{listing.name}</td>
                  <td>{listing.price}</td>
                  <td>{listing.stock}</td>
                  <td>
                    <Button variant='warning'>Edit</Button>{" "}
                    <Button
                      variant='danger'
                      onClick={() => handleDelete(listing.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageListings;
