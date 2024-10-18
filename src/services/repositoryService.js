// src/services/repositoryService.js

import axios from 'axios';
import authService from './authService';

const API_BASE_URL = 'http://localhost:3001';

const createRepository = async (repoData) => {
  return await axios.post(`${API_BASE_URL}/repositories`, repoData, { headers: authService.getAuthHeader() });
};

const getRepositories = async (userId) => {
  return await axios.get(`${API_BASE_URL}/repositories/${userId}`, {
    params: { userId },
    headers: authService.getAuthHeader(),
  });
};

const deleteRepository = async (repoId) => {
  return await axios.delete(`${API_BASE_URL}/repositories/user/${repoId}`, { headers: authService.getAuthHeader() });
}

export default {
  createRepository,
  getRepositories,
  deleteRepository,
};
