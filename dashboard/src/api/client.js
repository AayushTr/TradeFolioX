// dashboard/src/api/client.js
import axios from "axios";

// Make sure this ENV is set (REACT_APP_API_URL) in your Render dashboard settings
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL,
  withCredentials: true, // ensure cookies are sent from dashboard to backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
