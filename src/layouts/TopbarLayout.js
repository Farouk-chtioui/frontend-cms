// src/layouts/TopbarLayout.js
import React from 'react';
import { Box } from '@mui/material';
import Topbar from '../components/Topbar';

const TopbarLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default TopbarLayout;
