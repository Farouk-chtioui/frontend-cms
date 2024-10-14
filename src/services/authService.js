// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; // Update to match your backend URL

// Login function
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    
    const { access_token, userId } = response.data;
    console.log('Received userId:', userId); // Verify that userId is returned

    // Store the token and userId in localStorage
    localStorage.setItem('token', access_token);
    localStorage.setItem('userId', userId);

    console.log('Login successful, token and userId saved');
  } catch (error) {
    console.error('Login failed:', error); // Log any errors
  }
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
