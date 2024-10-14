import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  TextField,
  Box,
  Avatar,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import PublishIcon from '@mui/icons-material/Publish';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for projects
  const projects = [
    { name: 'Fares Revamp Test 2022' },
    { name: 'Project 1' },
    { name: 'Project 2' },
    { name: 'Project 3' },
  ];

  // Filter projects based on search input
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Section - Project Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleMenuClick}
            sx={{
              backgroundColor: '#00d2c6',
              borderRadius: 2,
              color: '#fff',
              p: 1,
            }}
          >
            ★
          </IconButton>

          <Typography variant="h6" sx={{ ml: 1 }}>
            Fares Revamp Test 2022
          </Typography>
          <ArrowDropDownIcon
            onClick={handleMenuClick}
            sx={{ cursor: 'pointer', ml: 1 }}
          />

          {/* Dropdown content */}
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
          >
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                }}
              />
            </Box>

            <MenuItem disabled>
              <Typography variant="subtitle2">My projects</Typography>
            </MenuItem>

            {filteredProjects.map((project, index) => (
              <MenuItem key={index} onClick={handleMenuClose}>
                <IconButton
                  sx={{
                    backgroundColor: '#00d2c6',
                    borderRadius: 2,
                    color: '#fff',
                    mr: 2,
                    p: 1,
                  }}
                >
                  ★
                </IconButton>
                <Typography>{project.name}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Last published date */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ ml: 4, display: { xs: 'none', sm: 'block' } }}
          >
            Last published 19 Oct. 2022 13:23 by Fares Abderrazak
          </Typography>
        </Box>

        {/* Right Section - Publish button and profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<PublishIcon />}
            sx={{ backgroundColor: '#4caf50' }}
          >
            Publish
          </Button>

          <Avatar sx={{ bgcolor: '#00d2c6', ml: 2 }}>F</Avatar>
          <Typography sx={{ ml: 1 }}>FaFares</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
