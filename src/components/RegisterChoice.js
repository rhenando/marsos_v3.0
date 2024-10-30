// src/components/RegisterChoice.js
import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterChoice = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Navigate to the respective registration page based on role
    if (role === "supplier") {
      navigate("/supplier-registration");
    } else if (role === "buyer") {
      navigate("/buyer-registration");
    }
  };

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center justify-content-center'
      style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}
    >
      <div className='text-center mb-4 d-flex flex-column align-items-center'>
        <img
          src='/path/to/logo.png' // Update with the correct path to your logo
          alt='Logo'
          style={{ width: "80px", marginBottom: "10px" }}
        />
        <h2 style={{ color: "#2d6a4f", fontWeight: "bold" }}>Register as a</h2>
      </div>

      <div
        className='p-4 border rounded shadow-sm bg-white text-center'
        style={{
          width: "100%",
          maxWidth: "350px",
          borderRadius: "8px",
          margin: "0 auto",
        }}
      >
        <div className='d-flex justify-content-around mb-4'>
          <Button
            onClick={() => handleRoleSelection("supplier")}
            className='w-45'
            style={{
              backgroundColor: "#2d6a4f",
              color: "#fff",
              borderColor: "#2d6a4f",
              width: "45%", // Ensuring uniform width for both buttons
              padding: "10px 0",
              fontWeight: "bold",
            }}
          >
            Supplier
          </Button>
          <Button
            onClick={() => handleRoleSelection("buyer")}
            className='w-45'
            style={{
              backgroundColor: "#2d6a4f",
              color: "#fff",
              borderColor: "#2d6a4f",
              width: "45%", // Ensuring uniform width for both buttons
              padding: "10px 0",
              fontWeight: "bold",
            }}
          >
            Buyer
          </Button>
        </div>
        <p className='text-muted mb-1'>
          Or you already have an account with us?{" "}
          <a href='/login' style={{ color: "#2d6a4f", fontWeight: "bold" }}>
            Login
          </a>
        </p>
        <a
          href='/guest'
          style={{
            color: "#2d6a4f",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Browse as a Guest
        </a>
      </div>
    </Container>
  );
};

export default RegisterChoice;
