import React, { useState, useEffect } from "react";
import {
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { ShoppingCart, User } from "react-feather";
import { useAuth } from "../../context/AuthContext";

const NavbarComponent = () => {
  const { currentUser, role } = useAuth(); // Access currentUser and role from context
  const dashboardLink =
    role === "buyer"
      ? "/buyer-home"
      : role === "supplier"
      ? "/supplier-home"
      : "/";

  // State to show or hide the navbar on scroll
  const [showNavbar, setShowNavbar] = useState(false);

  // Toggle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "5px 0" }}>
        <Container className='d-flex justify-content-between align-items-center'>
          {/* Left Side */}
          <div className='d-flex align-items-center'>
            <NavDropdown
              title='Language'
              id='language-dropdown'
              style={{ color: "#2c6449" }}
            >
              <NavDropdown.Item href='#'>English</NavDropdown.Item>
              <NavDropdown.Item href='#'>Arabic</NavDropdown.Item>
            </NavDropdown>
            <span style={{ color: "#6c757d", margin: "0 15px" }}>
              Currency: SR
            </span>
            {currentUser ? (
              <Nav.Link href='#' style={{ color: "#2c6449" }}>
                {currentUser.name || "User"}
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href='#' style={{ color: "#2c6449" }}>
                  Join as a Seller
                </Nav.Link>
                <Nav.Link href='#' style={{ color: "#2c6449" }}>
                  Zenah Blog
                </Nav.Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className='d-flex align-items-center'>
            <Nav.Link href='#' style={{ color: "#2c6449" }}>
              Al Jubail
            </Nav.Link>
          </div>
        </Container>
      </div>

      {/* Middle Section with Grouped Icons, Centered Links, and Logo */}
      <Container className='py-3 d-flex justify-content-between align-items-center'>
        {/* Grouped User Icon, Shopping Cart, and Search Bar */}
        <div className='d-flex align-items-center'>
          {currentUser ? (
            <NavDropdown
              title={
                <>
                  <User size={18} style={{ color: "#2c6449" }} />
                  <span style={{ marginLeft: "5px" }}>
                    {currentUser.name || "User"}
                  </span>
                </>
              }
              id='user-dropdown'
            >
              <NavDropdown.Item
                href={dashboardLink}
                style={{ color: "#2c6449" }}
              >
                My Account
              </NavDropdown.Item>
              <NavDropdown.Item href='#settings' style={{ color: "#2c6449" }}>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#logout' style={{ color: "#2c6449" }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button variant='link' href='/login' style={{ color: "#2c6449" }}>
              <User size={18} />
            </Button>
          )}
          <Button
            variant='link'
            href='#'
            style={{ color: "#2c6449", marginLeft: "10px" }}
          >
            <ShoppingCart size={18} />
          </Button>
          <Form className='d-flex mx-2' style={{ width: "200px" }}>
            <FormControl
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              style={{ borderRadius: "20px", padding: "10px" }}
            />
          </Form>
        </div>

        {/* Centered Navigation Links */}
        <Nav className='mx-3' style={{ justifyContent: "center", flexGrow: 1 }}>
          <Nav.Link href='#home' style={{ color: "#2c6449" }}>
            Home
          </Nav.Link>
          <Nav.Link href='#features' style={{ color: "#2c6449" }}>
            Features
          </Nav.Link>
          <Nav.Link href='#catalog' style={{ color: "#2c6449" }}>
            Catalog
          </Nav.Link>
          <Nav.Link href='#contact' style={{ color: "#2c6449" }}>
            Contact
          </Nav.Link>
        </Nav>

        {/* Logo on the Right */}
        <a href='#home' className='ms-2'>
          <img src='./logo-marsos.svg' alt='Logo' style={{ width: "100px" }} />
        </a>
      </Container>

      {/* Main Navigation Bar - Visible on scroll with white background */}
      {showNavbar && (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px 0",
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Container>
            <Nav className='justify-content-center'>
              {currentUser ? (
                <NavDropdown
                  title={<User size={18} style={{ color: "#2c6449" }} />}
                  id='user-dropdown-main'
                >
                  <NavDropdown.Item
                    href={dashboardLink}
                    style={{ color: "#2c6449" }}
                  >
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href='#settings'
                    style={{ color: "#2c6449" }}
                  >
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#logout' style={{ color: "#2c6449" }}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button
                  variant='link'
                  href='/login'
                  style={{ color: "#2c6449" }}
                >
                  <User size={18} />
                </Button>
              )}
              <Form className='d-flex mx-3' style={{ width: "200px" }}>
                <FormControl
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                  style={{ borderRadius: "20px", padding: "10px" }}
                />
              </Form>
              <Nav.Link href='#' style={{ color: "#2c6449" }}>
                Help Center
              </Nav.Link>
              <Nav.Link href='#' style={{ color: "#2c6449" }}>
                Get the App
              </Nav.Link>
              <Nav.Link
                href='/supplier-registration'
                style={{ color: "#2c6449" }}
              >
                Become Vendor
              </Nav.Link>
            </Nav>
          </Container>
        </div>
      )}
    </>
  );
};

export default NavbarComponent;
