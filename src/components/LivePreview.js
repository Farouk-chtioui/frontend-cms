import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import 'react-device-frameset/styles/device-selector.min.css';

const LivePreview = ({ bottomBarTabs }) => {
  return (
    <Box sx={{ marginLeft: 4, textAlign: 'center', flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Live Preview
      </Typography>
      <DeviceFrameset device="iPhone X" color="black">
        <Paper
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            margin: '0 auto',
            boxShadow: 3,
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Your App Content Here</Typography>
          </Box>
          <Box
            sx={{
              height: '10%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: '#f1f1f1',
            }}
          >
            {bottomBarTabs.filter(tab => tab.visible).map((tab) => (
              <Box key={tab.iconName} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {tab.icon}
                <Typography variant="caption">{tab.name}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </DeviceFrameset>
    </Box>
  );
};

export default LivePreview;