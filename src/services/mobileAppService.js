// src/services/mobileAppService.js
import axios from 'axios';
import authService from './authService';

const API_URL_MOBILE_APP = 'http://localhost:3001/mobile-app';

// Create a mobile app
const createMobileApp = async (appData) => {
  return await axios.post(`${API_URL_MOBILE_APP}`, appData, { headers: authService.getAuthHeader() });
};

const updateMobileAppDesign = async (mobileAppId, designData) => {
  return await axios.put(`${API_URL_MOBILE_APP}/${mobileAppId}/design`, designData, { headers: authService.getAuthHeader() });
};

const getMobileAppById = async (appId) => {
  return await axios.get(`${API_URL_MOBILE_APP}/${appId}`, { headers: authService.getAuthHeader() });
};



const updateMobileAppDesignByRepoId = async (repoId, designData) => {
  return await axios.put(`${API_URL_MOBILE_APP}/${repoId}/repository`, designData, { headers: authService.getAuthHeader() });
}
export default {
  createMobileApp,
  updateMobileAppDesign,
  getMobileAppById,
  updateMobileAppDesignByRepoId,
};
