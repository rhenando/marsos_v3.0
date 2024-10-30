import React, { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Importing UUID generator

const BuyerRegistration = () => {
  const [countryCode, setCountryCode] = useState("+966");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("User is not authenticated. Please log in.");
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const uid = user.uid || uuidv4(); // Use UID from Firebase or generate UUID
    const fullPhoneNumber = `${countryCode}${phone}`;
    const role = "buyer"; // Set user role as buyer

    try {
      // Use UID as the document ID and add user data to Firestore
      await setDoc(
        doc(db, "users", uid),
        {
          role,
          name,
          email,
          phone: fullPhoneNumber,
        },
        { merge: true }
      );

      // Store token or a flag to indicate successful registration
      const token = await user.getIdToken(); // Get token for later authentication
      localStorage.setItem("authToken", token); // Store token in localStorage

      alert("Buyer registered successfully!");
      navigate("/login"); // Redirect to login page after successful registration

      // Clear form fields
      setCountryCode("+966");
      setPhone("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding buyer to Firestore:", error);
      alert("Failed to register buyer.");
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
          src='/path/to/logo.png'
          alt='Logo'
          style={{ width: "80px", marginBottom: "10px" }}
        />
        <h2 style={{ color: "#2d6a4f", fontWeight: "bold" }}>
          Buyer Registration
        </h2>
      </div>

      <Form
        onSubmit={handleSubmit}
        className='p-4 border rounded shadow-sm bg-white'
        style={{
          width: "100%",
          maxWidth: "350px",
          borderRadius: "8px",
          margin: "0 auto",
        }}
      >
        {/* Phone Number */}
        <Form.Group controlId='formPhoneNumber' className='mb-3'>
          <InputGroup>
            <Form.Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              style={{ maxWidth: "90px" }}
            >
              <option value='+966'>+966</option>
              <option value='+1'>+1</option>
              <option value='+41'>+41</option>
              <option value='+63'>+63</option>
            </Form.Select>
            <Form.Control
              type='tel'
              placeholder='Enter your phone number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </InputGroup>
        </Form.Group>

        {/* Name */}
        <Form.Group controlId='formName' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId='formEmail' className='mb-3'>
          <Form.Control
            type='email'
            placeholder='Enter your email (optional)'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          variant='success'
          type='submit'
          className='w-100'
          style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
        >
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default BuyerRegistration;
