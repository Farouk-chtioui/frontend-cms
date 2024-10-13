// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; // Update to match your backend URL

// Login function
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  const { token, userId } = response.data;

  // Store the token and userId in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
};

// Logout function
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

// Check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Return true if token exists
};

// Get auth headers for authenticated requests
const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
};

export default {
  login,
  logout,
  isAuthenticated,
  getAuthHeader,
};
