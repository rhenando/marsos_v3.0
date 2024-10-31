// src/components/CatalogSection.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const CatalogSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Extract the last price range and its price if available
          const lastPriceRange =
            data.priceRanges?.[data.priceRanges.length - 1];
          const price = lastPriceRange ? `${lastPriceRange.price} SAR` : "N/A"; // Add "SAR" as currency
          return {
            id: doc.id,
            name: data.name,
            mainImage: data.images?.mainImage,
            price,
          };
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id='catalog' className='py-5 bg-light'>
      <Container>
        <h2 className='text-center mb-4'>Featured Products</h2>
        <Row>
          {products.map((product) => (
            <Col md={4} key={product.id} className='mb-4'>
              <Card>
                <Card.Img
                  variant='top'
                  src={
                    product.mainImage || "https://via.placeholder.com/300x200"
                  }
                  alt={product.name}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className='text-center'>
                    {product.name}
                  </Card.Title>
                  <Card.Text className='text-center'>
                    <strong>Price:</strong> {product.price}
                  </Card.Text>
                  <div className='d-flex justify-content-center'>
                    <Button
                      variant='primary'
                      style={{
                        backgroundColor: "#2c6449",
                        borderColor: "#2c6449",
                      }}
                    >
                      Contact Supplier
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CatalogSection;
