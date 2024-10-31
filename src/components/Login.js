// src/components/Login.js
import React, { useState } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [countryCode, setCountryCode] = useState("+966"); // Default country code
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  // Initialize RecaptchaVerifier only once
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            console.log("Recaptcha expired, please verify again.");
          },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const fullPhoneNumber = `${countryCode}${phone}`;

    signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        setLoading(false);
      });
  }

  async function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        const fullPhoneNumber = `${countryCode}${phone}`;

        // Check Firestore for existing user with this phone number
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phone", "==", fullPhoneNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const role = userData.role;

          const redirectRoute =
            role === "buyer" ? "/buyer-home" : "/supplier-home";

          toast.success("Login successful!");
          setLoading(false);
          navigate(redirectRoute);
        } else {
          setLoading(false);
          navigate("/register-choice");
        }
      })
      .catch((err) => {
        console.error("OTP verification failed:", err);
        setLoading(false);
        toast.error("Invalid OTP. Please try again.");
      });
  }

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center justify-content-center'
      style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}
    >
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id='recaptcha-container'></div>

      <div className='text-center mb-4 d-flex flex-column align-items-center'>
        <img
          src='./logo-marsos.svg'
          alt='Logo'
          style={{ width: "80px", marginBottom: "10px" }}
        />
        <h2 style={{ color: "#2d6a4f", fontWeight: "bold" }}>
          Login or Register
        </h2>
      </div>

      <Form
        onSubmit={(e) => e.preventDefault()}
        className='p-4 border rounded shadow-sm bg-white'
        style={{
          width: "100%",
          maxWidth: "350px",
          borderRadius: "8px",
          margin: "0 auto",
        }}
      >
        {showOTP ? (
          <>
            <h5 className='text-center mb-4' style={{ color: "#2d6a4f" }}>
              Enter OTP
            </h5>
            <div className='d-flex justify-content-center mb-4'>
              <BsFillShieldLockFill size={40} color='#2d6a4f' />
            </div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType='number'
              disabled={false}
              autoFocus
              className='opt-container mb-3'
            />
            <Button
              onClick={onOTPVerify}
              className='w-100'
              style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
            >
              {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
              Verify OTP
            </Button>
          </>
        ) : (
          <>
            <h5 className='text-center mb-4' style={{ color: "#2d6a4f" }}>
              Verify your account
            </h5>
            <InputGroup className='mb-3'>
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
            <Button
              onClick={onSignup}
              className='w-100'
              style={{ backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" }}
            >
              {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
              Send code via SMS
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default Login;
