// src/components/Topbar.js
import React from 'react';
import { Button } from '@mui/material';
import authService from '../services/authService';

const Topbar = () => {
  // Handle user logout
  const handleLogout = () => {
    authService.logout(); // Clears the token and userId
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#424242', display: 'flex', justifyContent: 'space-between' }}>
      <h2 style={{ color: '#fff' }}>Dashboard</h2>
      <Button variant="contained" onClick={handleLogout} style={{ backgroundColor: '#ff3d00' }}>
        Logout
      </Button>
    </div>
  );
};

export default Topbar;
