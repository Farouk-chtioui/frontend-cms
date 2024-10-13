// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

// Icons for main menu
import DashboardIcon from '@mui/icons-material/Home';
import DesignServicesIcon from '@mui/icons-material/Brush';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ForumIcon from '@mui/icons-material/Forum';
import InsightsIcon from '@mui/icons-material/Insights';

const Sidebar = () => {
  const location = useLocation(); // Get the current path

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'App Design', icon: <DesignServicesIcon />, path: '/app-design' },
    { text: 'App Layout', icon: <ViewModuleIcon />, path: '/app-layout' },
    { text: 'Communicate', icon: <ForumIcon />, path: '/communicate' },
    { text: 'Statistics', icon: <InsightsIcon />, path: '/statistics' },
  ];

  const contentItems = [
    { text: 'Activities', path: '/activities' },
    { text: 'Locations', path: '/locations' },
    { text: 'Editorial Pages', path: '/editorial-pages' },
    { text: 'Regions', path: '/regions' },
    { text: 'Images', path: '/images' },
    { text: 'Webviews', path: '/webviews' },
    { text: 'Widget Screens', path: '/widget-screens' },
    { text: 'Tags', path: '/tags' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#fafafa' },
      }}
    >
      <div style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold' }}>
        {/* Logo will be added here later */}
        <Typography variant="h5" sx={{ fontFamily: 'Roboto, sans-serif', color: '#424242' }}>Leap</Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: '#757575' }}>Mobile Apps</Typography>
      </div>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={index}
            sx={{
              '&:hover .MuiListItemText-root': {
                color: '#6D6CFE', // Only change text color on hover
              },
              '&:hover .MuiListItemIcon-root': {
                color: '#6D6CFE', // Only change icon color on hover
              },
              color: location.pathname === item.path ? '#6D6CFE' : '#424242', // Highlight active item
              '& .MuiListItemText-root': {
                color: location.pathname === item.path ? '#6D6CFE' : '#424242', // Set text color for active
              },
              '& .MuiListItemIcon-root': {
                color: location.pathname === item.path ? '#6D6CFE' : '#424242', // Set icon color for active
              },
              backgroundColor: 'transparent', // No background change on hover
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography
        variant="subtitle1"
        sx={{ marginLeft: '16px', marginTop: '16px', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', color: '#757575' }}
      >
        CONTENT
      </Typography>
      <List>
        {contentItems.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={index}
            sx={{
              '&:hover .MuiListItemText-root': {
                color: '#6D6CFE', // Only change text color on hover
              },
              '&:hover .MuiListItemIcon-root': {
                color: '#6D6CFE', // Only change icon color on hover
              },
              color: location.pathname === item.path ? '#6D6CFE' : '#424242', // Highlight active item
              '& .MuiListItemText-root': {
                color: location.pathname === item.path ? '#6D6CFE' : '#424242', // Set text color for active
              },
              backgroundColor: 'transparent', // No background change on hover
            }}
          >
            <ListItemText primary={item.text} sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;