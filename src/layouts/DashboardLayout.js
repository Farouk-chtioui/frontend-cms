import React, { useEffect } from 'react';
import { Box, Toolbar, Grid } from '@mui/material';
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
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            backgroundColor: '#f5f5f5',  // Optional light background for the content
            overflow: 'auto',            // Ensure scrolling if content overflows
            marginTop: '64px',           // Space for the fixed Topbar height
          }}
        >
          <Grid container spacing={3}>
            {children}  {/* This will contain the content passed to the layout */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
