// src/components/Login.js
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
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
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
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
        const phoneNumber = "+" + ph;
        console.log("Verifying user with phone:", phoneNumber);

        // Check Firestore for existing user with this phone number
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phone", "==", phoneNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const role = userData.role;
          console.log("User found in Firestore:", userData);

          // Directly set the redirection route based on role
          const redirectRoute =
            role === "buyer" ? "/buyer-home" : "/supplier-home";

          toast.success("Login successful!");
          setLoading(false);
          navigate(redirectRoute); // Navigate directly to the role-based home
        } else {
          // If user is not found, redirect to RegisterChoice
          console.log("No user found for phone:", phoneNumber);
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
    <section className='bg-emerald-500 flex items-center justify-center h-screen'>
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id='recaptcha-container'></div>
        {showOTP ? (
          <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
            <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
              Enter OTP
            </h1>
            <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
              <BsFillShieldLockFill size={30} />
            </div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType='number'
              disabled={false}
              autoFocus
              className='opt-container'
            />
            <button
              onClick={onOTPVerify}
              className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
            >
              {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
              <span>Verify OTP</span>
            </button>
          </div>
        ) : (
          <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
            <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
              Welcome to <br /> CODE A PROGRAM
            </h1>
            <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
              <BsTelephoneFill size={30} />
            </div>
            <label
              htmlFor=''
              className='font-bold text-xl text-white text-center'
            >
              Verify your phone number
            </label>
            <PhoneInput country={"in"} value={ph} onChange={setPh} />
            <button
              onClick={onSignup}
              className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
            >
              {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
              <span>Send code via SMS</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
