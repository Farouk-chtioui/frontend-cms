// src/layouts/DashboardLayout.js
import React, { useEffect } from 'react';
import { Box, Toolbar, Grid2 } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  // Check if user is authenticated, otherwise redirect to login
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  if (!authService.isAuthenticated()) {
    return null; // Return nothing if the user is not authenticated
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}
      >
        <Toolbar />
        <Grid2 container spacing={3}>
          {children}
        </Grid2>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
