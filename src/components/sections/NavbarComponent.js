// src/components/NavbarComponent.js
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { User } from "react-feather";
import { useAuth } from "../../context/AuthContext";

const NavbarComponent = () => {
  const { currentUser, role } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const dashboardLink =
    role === "buyer"
      ? "/buyer-home"
      : role === "supplier"
      ? "/supplier-home"
      : "/";

  // Scroll listener to toggle `isScrolled`
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <Navbar
        expand='lg' // Responsive on smaller screens
        fixed='top'
        style={{
          backgroundColor: "white",
          transition: "transform 0.3s ease",
          transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {currentUser ? (
                <NavDropdown
                  title={
                    <User
                      size={18}
                      style={{ color: "#2c6449", marginBottom: "3px" }}
                    />
                  }
                  id='user-dropdown'
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
                <Nav.Link href='/login' style={{ color: "#2c6449" }}>
                  <User
                    size={18}
                    style={{ color: "#2c6449", marginBottom: "3px" }}
                  />
                </Nav.Link>
              )}
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
          </Navbar.Collapse>
          <Navbar.Brand className='ms-auto' href='#home'>
            <img
              src='./logo-marsos.svg'
              alt='Logo'
              style={{ width: "100px" }}
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Secondary Navbar */}
      <Navbar
        fixed='top'
        style={{
          backgroundColor: isScrolled ? "white" : "#2c6449",
          color: isScrolled ? "#2c6449" : "white",
          top: isScrolled ? "0" : "60px",
          width: "100%",
          zIndex: 999,
          transition:
            "background-color 0.3s ease, color 0.3s ease, top 0.3s ease",
          boxShadow: isScrolled ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Container className='d-flex justify-content-between align-items-center'>
          <Nav className='flex-grow-1 justify-content-between'>
            <Nav.Link
              href='#all-categories'
              style={{
                color: isScrolled ? "#2c6449" : "white",
                margin: "0 10px",
              }}
            >
              All Categories
            </Nav.Link>
            <Nav.Link
              href='#featured-selections'
              style={{
                color: isScrolled ? "#2c6449" : "white",
                margin: "0 10px",
              }}
            >
              Featured Selections
            </Nav.Link>
            <Nav.Link
              href='#trade-assurance'
              style={{
                color: isScrolled ? "#2c6449" : "white",
                margin: "0 10px",
              }}
            >
              Trade Assurance
            </Nav.Link>
            <Nav.Link
              href='#buyer-central'
              style={{
                color: isScrolled ? "#2c6449" : "white",
                margin: "0 10px",
              }}
            >
              Buyer Central
            </Nav.Link>
            <Nav.Link
              href='#help-center'
              style={{
                color: isScrolled ? "#2c6449" : "white",
                margin: "0 10px",
              }}
            >
              Help Center
            </Nav.Link>
            <Nav.Link
              href='#get-app'
              style={{
                color: isScrolled ? "#2c6449" : "white",
                margin: "0 10px",
              }}
            >
              Get the App
            </Nav.Link>
            <Nav.Link
              href='#become-vendor'
              style={{
                color: isScrolled ? "#2c6449" : "white",
                margin: "0 10px",
              }}
            >
              Become a Vendor
            </Nav.Link>
          </Nav>

          {/* Right-side Logo, Only Visible on Scroll */}
          <Navbar.Brand
            href='#home'
            style={{
              opacity: isScrolled ? 1 : 0,
              transition: "opacity 0.3s ease",
              width: "50px",
            }}
          >
            <img src='./logo-marsos.svg' alt='Secondary Logo' />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Add margin to main content to prevent overlap */}
      <div style={{ marginTop: "120px" }}>
        {/* Here goes the rest of your content, such as HeroSection */}
      </div>
    </>
  );
};

export default NavbarComponent;
