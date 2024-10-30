// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCXSCOBwTUUxWIv6z0n19Xj6dVQp7Swu2Y",
  authDomain: "marsos-82cb1.firebaseapp.com",
  projectId: "marsos-82cb1",
  storageBucket: "marsos-82cb1.appspot.com",
  messagingSenderId: "935923725562",
  appId: "1:935923725562:web:486dd83dcfb953685f8543",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize each Firebase service separately
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// Export individual services as needed
export { app, auth, db, functions };
