import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const CatalogSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const lastPriceRange =
            data.priceRanges?.[data.priceRanges.length - 1];
          const price = lastPriceRange ? `${lastPriceRange.price} SAR` : "N/A";

          return {
            id: doc.id,
            name: data.name,
            mainImage:
              data.images?.mainImage || "https://via.placeholder.com/300x200",
            price,
          };
        });

        console.log("Fetched products data:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container className='py-5 text-center'>Loading products...</Container>
    );
  }

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
                  src={product.mainImage}
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
                  <div className='d-flex justify-content-around'>
                    <Button
                      variant='primary'
                      style={{
                        backgroundColor: "#2c6449",
                        borderColor: "#2c6449",
                      }}
                    >
                      Contact Supplier
                    </Button>
                    <Link to={`/products/${product.id}`}>
                      <Button variant='secondary'>View Details</Button>
                    </Link>
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
