import axios from 'axios';

// Create an Axios instance with standard configuration
const api = axios.create({
  // With Vite proxy, we can just use /api prefix
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true, // Important for sending/receiving session cookies
});

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if unauthorized
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - potentially expired session');
      // Here you could trigger a state update to log the user out
      // e.g. using a global store or event bus
    }
    return Promise.reject(error);
  }
);

export default api;
