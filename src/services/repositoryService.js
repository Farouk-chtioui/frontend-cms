// src/services/repositoryService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const createRepository = (repoData) => {
  return axios.post(`${API_BASE_URL}/repositories`, repoData);  // Ensure repoData includes the owner
};

const getRepositories = (userId) => {
  return axios.get(`${API_BASE_URL}/repositories`, { params: { userId } });
};

export default {
  createRepository,
  getRepositories,
};
