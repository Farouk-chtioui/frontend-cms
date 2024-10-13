// src/services/repositoryService.js
import axios from 'axios';
import authService from './authService'; // Use authService to include authentication headers

const API_URL = 'http://localhost:3001/repositories'; // Update to match your backend URL

// Create a new repository
const createRepository = async (repoData) => {
  return await axios.post(API_URL, repoData, authService.getAuthHeader());
};

// Fetch repositories for the authenticated user
const getRepositories = async () => {
  return await axios.get(API_URL, authService.getAuthHeader());
};

export default {
  createRepository,
  getRepositories,
};
