// src/services/mobileAppService.js
import axios from 'axios';
import authService from './authService';

// Base URL for mobile apps
const API_URL_MOBILE_APP = 'http://localhost:3001/mobile-apps';

// Create a mobile app
const createMobileApp = async (appData) => {
  return await axios.post(`${API_URL_MOBILE_APP}`, appData, { headers: authService.getAuthHeader() });
};

// Update the design of a mobile app
const updateMobileAppDesign = async (mobileAppId, designData) => {
  return await axios.put(`${API_URL_MOBILE_APP}/${mobileAppId}/design`, designData, { headers: authService.getAuthHeader() });
};

// Fetch a specific mobile app's details by ID
const getMobileAppById = async (appId) => {
  return await axios.get(`${API_URL_MOBILE_APP}/${appId}`, { headers: authService.getAuthHeader() });
};

export default {
  createMobileApp,
  updateMobileAppDesign,
  getMobileAppById,
};