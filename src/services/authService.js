// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; 

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    
    const { access_token, userId, email } = response.data;
    localStorage.setItem('email', email);
    localStorage.setItem('token', access_token);
    localStorage.setItem('userId', userId);
  } catch (error) {
    console.error('Login failed:', error); 
    throw error; // Re-throw the error to handle it in the calling function
  }
};


const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('userId');
  localStorage.removeItem('selectedRepo');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
};

export default {
  login,
  logout,
  isAuthenticated,
  getAuthHeader,
};
