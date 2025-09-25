import axios from 'axios';


const baseURL= process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


const client = axios.create({
  baseURL,
  withCredentials: true, // important so cookies are sent/received
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
