// frontend/src/api/axiosConfig.js
import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL // This will be used on Render
  : 'http://localhost:5000/api';  // This is used for local development

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default apiClient;