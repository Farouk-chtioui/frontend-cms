// src/services/mobileAppService.js
import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:3001/repositories'; // Base URL for repositories and mobile apps

// Create a mobile app within a repository
const createMobileApp = async (repoId, appData) => {
  return await axios.post(`${API_URL}/${repoId}/mobile-apps`, appData, authService.getAuthHeader());
};

// Update a mobile app's theme within a repository
const updateMobileAppTheme = async (repoId, appId, themeData) => {
  return await axios.put(`${API_URL}/${repoId}/mobile-apps/${appId}/theme`, themeData, authService.getAuthHeader());
};

// Fetch a specific mobile app's details
const getMobileAppById = async (repoId, appId) => {
  return await axios.get(`${API_URL}/${repoId}/mobile-apps/${appId}`, authService.getAuthHeader());
};

export default {
  createMobileApp,
  updateMobileAppTheme,
  getMobileAppById,
};
