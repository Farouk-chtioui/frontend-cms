import React, { useEffect } from 'react';
import { Box, Toolbar, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();


  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login'); 
    }
  }, [navigate]);

  if (!authService.isAuthenticated()) {
    return null; 
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
            backgroundColor: '#f5f5f5', 
            overflow: 'auto',            
            marginTop: '60px',           
          }}
        >
          <Grid container spacing={3}>
            {children}  
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
