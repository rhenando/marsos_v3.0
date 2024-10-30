// src/api.js
import axios from "axios";

// Replace with your Firebase function base URL
const API_URL =
  "https://YOUR_FIREBASE_REGION-YOUR_PROJECT_ID.cloudfunctions.net";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to attach JWT to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming token is saved in local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
