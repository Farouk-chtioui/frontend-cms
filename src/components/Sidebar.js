import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Dialog,
  DialogActions, DialogContent, DialogContentText, Button,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Home';
import DesignServicesIcon from '@mui/icons-material/Brush';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ForumIcon from '@mui/icons-material/Forum';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';

import authService from '../services/authService';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const activeColor = theme.palette.primary.main;
  const inactiveColor = theme.palette.text.primary;

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

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
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: theme.palette.background.default },
      }}
    >
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <img src="/path/to/logo.png" alt="Logo" style={{ maxWidth: '100px' }} />
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Mobile Apps</Typography>
      </div>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={index}
            aria-current={location.pathname === item.path ? 'page' : undefined}
            sx={{
              color: location.pathname === item.path ? activeColor : inactiveColor,
              '& .MuiListItemText-root': {
                color: location.pathname === item.path ? activeColor : inactiveColor,
              },
              '&:hover .MuiListItemText-root': { color: activeColor },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="subtitle1" sx={{ marginLeft: '16px', marginTop: '16px', color: theme.palette.text.secondary }}>
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
              color: location.pathname === item.path ? activeColor : inactiveColor,
              '& .MuiListItemText-root': {
                color: location.pathname === item.path ? activeColor : inactiveColor,
              },
              '&:hover .MuiListItemText-root': { color: activeColor },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => setLogoutDialogOpen(true)}
          sx={{
            color: inactiveColor,
            '& .MuiListItemText-root': { color: inactiveColor },
            '&:hover .MuiListItemText-root': { color: activeColor },
          }}
        >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>

      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="primary">Logout</Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
