import axios from 'axios';
import authService from './authService';

const API_URL_MOBILE_APP = 'http://localhost:3001/mobile-app';  // Adjust based on your backend's host/port

// Existing methods
const createMobileApp = async (appData) => {
  return await axios.post(`${API_URL_MOBILE_APP}`, appData, { headers: authService.getAuthHeader() });
};

const updateMobileAppDesign = async (mobileAppId, designData) => {
  return await axios.put(`${API_URL_MOBILE_APP}/${mobileAppId}/design`, designData, { headers: authService.getAuthHeader() });
};

const getMobileAppById = async (appId) => {
  return await axios.get(`${API_URL_MOBILE_APP}/${appId}`, { headers: authService.getAuthHeader() });
};

const findMobileAppByRepositoryId = async (repoId) => {
  return await axios.get(`${API_URL_MOBILE_APP}/${repoId}/repository`, { headers: authService.getAuthHeader() });
};

const updateMobileAppDesignByRepoId = async (repoId, designData) => {
  return await axios.put(`${API_URL_MOBILE_APP}/${repoId}/repository`, designData, { headers: authService.getAuthHeader() });
};

const generateAppWithTheme = async (appData) => {
  return await axios.post(`${API_URL_MOBILE_APP}/generate`, appData, { headers: authService.getAuthHeader() });
};

export default {
  createMobileApp,
  updateMobileAppDesign,
  getMobileAppById,
  updateMobileAppDesignByRepoId,
  findMobileAppByRepositoryId,
  generateAppWithTheme,  // Export the new method
};
