import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Spinner, Badge, ProgressBar } from "react-bootstrap";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { FaStar, FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CatalogSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reference to control the slider
  const sliderRef = useRef(null);

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
          const originalPrice = data.originalPrice || null;
          const discount = originalPrice
            ? Math.round(
                ((originalPrice - lastPriceRange.price) / originalPrice) * 100
              )
            : 0;
          return {
            id: doc.id,
            category: data.category || "General",
            name: data.name,
            mainImage:
              data.images?.mainImage || "https://via.placeholder.com/300x200",
            price,
            originalPrice,
            discount,
            rating: data.rating || 0,
            stock: data.stock || 0,
          };
        });
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
      <Container className='py-5 text-center'>
        <Spinner animation='border' variant='primary' />
      </Container>
    );
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Disable default arrows to use custom arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      id='catalog'
      className='py-5'
      style={{ backgroundColor: "#f8f9fa", position: "relative" }}
    >
      <Container>
        <h2
          className='text-center mb-5'
          style={{ color: "#000", fontWeight: "bold" }}
        >
          Featured Products
        </h2>

        {/* Left Arrow Button */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px", // Padding from the left edge
            zIndex: 2,
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#28a745", // Green color
            fontSize: "2rem", // Bigger size
            opacity: 0.7, // Added opacity for softer look
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
        >
          <FaChevronLeft />
        </button>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {products.map((product) => (
            <div key={product.id} className='px-2'>
              <Card
                className='shadow-sm h-100 border-0'
                style={{ borderRadius: "12px", position: "relative" }}
              >
                {/* Heart icon for wishlist */}
                <FaHeart
                  className='position-absolute top-0 end-0 m-2 text-muted'
                  style={{ fontSize: "1.2rem", cursor: "pointer" }}
                />

                <Card.Img
                  variant='top'
                  src={product.mainImage}
                  alt={product.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                  }}
                />

                <Card.Body>
                  <small
                    className='text-uppercase'
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      color: "#5cbec9",
                    }}
                  >
                    {product.category}
                  </small>

                  <Card.Title
                    className='mt-1 mb-2'
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      lineHeight: "1.2em",
                    }}
                  >
                    {product.name}
                  </Card.Title>

                  {/* Star Rating */}
                  <div className='d-flex align-items-center mb-2'>
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={
                          index < Math.round(product.rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        style={{ fontSize: "0.8rem" }}
                      />
                    ))}
                    <small
                      className='ms-2 text-muted'
                      style={{ fontSize: "0.8rem" }}
                    >
                      {product.rating.toFixed(2)}
                    </small>
                  </div>

                  {/* Price and Discount */}
                  <div className='d-flex align-items-center mb-2'>
                    <h5
                      className='text-success mb-0'
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      {product.price}
                    </h5>
                    {product.originalPrice && (
                      <small
                        className='text-muted ms-2'
                        style={{
                          textDecoration: "line-through",
                          fontSize: "0.85rem",
                        }}
                      >
                        {product.originalPrice} SAR
                      </small>
                    )}
                    {product.discount > 0 && (
                      <Badge
                        bg='danger'
                        className='ms-2'
                        style={{ fontSize: "0.8rem" }}
                      >
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Stock Availability */}
                  <div className='mt-2'>
                    <small
                      className='text-muted'
                      style={{ fontSize: "0.75rem" }}
                    >
                      Available only: {product.stock}
                    </small>
                    <ProgressBar
                      now={(product.stock / 100) * 100} // Assuming max stock is 100 for example
                      variant='danger'
                      className='mt-1'
                      style={{ height: "6px", borderRadius: "3px" }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>

        {/* Right Arrow Button */}
        <button
          onClick={() => sliderRef.current.slickNext()}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px", // Padding from the right edge
            zIndex: 2,
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#28a745", // Green color
            fontSize: "2rem", // Bigger size
            opacity: 0.7, // Added opacity for softer look
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
        >
          <FaChevronRight />
        </button>
      </Container>
    </section>
  );
};

export default CatalogSection;
