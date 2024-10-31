import React, { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SupplierRegistration = () => {
  const [countryCode, setCountryCode] = useState("+966");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [crNumber, setCrNumber] = useState("");
  const [crLicense, setCrLicense] = useState(null);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [otherCitiesServed, setOtherCitiesServed] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("own");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("User is not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    const uid = user.uid;
    const fullPhoneNumber = `${countryCode}${phone}`;

    try {
      // Save supplier data in the 'users' collection with role specified as "supplier"
      await setDoc(
        doc(db, "users", uid),
        {
          role: "supplier", // Set role as "supplier"
          name,
          email,
          phone: fullPhoneNumber,
          companyName,
          crNumber,
          crLicense,
          location,
          city,
          region,
          otherCitiesServed,
          deliveryOption,
          uid,
        },
        { merge: true }
      );

      alert("Supplier registered successfully!");
      navigate("/supplier-home"); // Redirect to supplier home page

      // Clear form fields
      setCountryCode("+966");
      setPhone("");
      setName("");
      setEmail("");
      setCompanyName("");
      setCrNumber("");
      setCrLicense(null);
      setLocation("");
      setCity("");
      setRegion("");
      setOtherCitiesServed("");
      setDeliveryOption("own");
    } catch (error) {
      console.error("Error registering supplier:", error);
      alert("Failed to register supplier. Please try again.");
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
          Supplier Registration
        </h2>
      </div>

      <Form
        onSubmit={handleSubmit}
        className='p-4 border rounded shadow-sm bg-white'
        style={{
          width: "100%",
          maxWidth: "400px",
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
              style={{ maxWidth: "100px" }}
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

        <Form.Group controlId='formName' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formEmail' className='mb-3'>
          <Form.Control
            type='email'
            placeholder='Enter your email (optional)'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formCompanyName' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter your company name'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formCrNumber' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter your CR number'
            value={crNumber}
            onChange={(e) => setCrNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formCrLicense' className='mb-3'>
          <Form.Control
            type='file'
            onChange={(e) => setCrLicense(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId='formLocation' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter your location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formCity' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter your city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formRegion' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter your region'
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formOtherCitiesServed' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter other cities served'
            value={otherCitiesServed}
            onChange={(e) => setOtherCitiesServed(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formDeliveryOption' className='mb-3'>
          <div>
            <Form.Check
              type='radio'
              label='Own Delivery'
              name='deliveryOption'
              value='own'
              checked={deliveryOption === "own"}
              onChange={(e) => setDeliveryOption(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Outside Delivery'
              name='deliveryOption'
              value='outside'
              checked={deliveryOption === "outside"}
              onChange={(e) => setDeliveryOption(e.target.value)}
            />
          </div>
        </Form.Group>

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

export default SupplierRegistration;
