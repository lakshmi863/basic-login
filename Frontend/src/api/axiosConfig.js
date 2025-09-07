// frontend/src/api/axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API URL
  withCredentials: true, // This is crucial for sending cookies with every request
});

export default apiClient;