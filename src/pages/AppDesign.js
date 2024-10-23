import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  ClickAwayListener,
  Tabs,
  Tab,
  Grid2,
} from '@mui/material';
import { SketchPicker } from 'react-color';
import mobileAppService from '../services/mobileAppService';
import { useRepo } from '../context/RepoContext';

const AppDesign = () => {
  const [theme, setTheme] = useState('light');
  const initialColors = {
    backgroundColor: '#FFACC',
    secondaryBackgroundColor: '#6D1E1E',
    mainTextColor: '#FFFFFF',
    titleTextColor: '#29C00',
    importantInformationTextColor: '#00BC78',
    accentColor: '#7A7AFF',
    secondaryAccentColor: '#8400F6',
    bottomBarBackgroundColor: '#000000',
    bottomBarSelectedIconColor: '#F9FFC3',
    bottomBarUnselectedIconColor: '#FFFFFF',
    topBarBackgroundColor: '#FF2929',
    topBarIconTextColor: '#FFFFFF',
    statusBarTheme: 'light',
  };

  const [colors, setColors] = useState(initialColors);
  const [showColorPicker, setShowColorPicker] = useState({});
  const { selectedRepo } = useRepo();

    useEffect(() => {
      const fetchExistingDesign = async () => {
        if (!selectedRepo) {
          return;
        }
  
        try {
          const response = await mobileAppService.findMobileAppByRepositoryId(selectedRepo._id);
          if (response.data && response.data.appDesignId) {
            setColors(response.data.appDesignId);
          }
        } catch (error) {
          console.error('Error fetching existing design:', error);
        }
      };
  
      fetchExistingDesign();
    }, [selectedRepo, setColors]);

  const handleThemeChange = (event, newValue) => {
    setTheme(newValue);
  };

  const handleColorChange = (color, key) => {
    setColors((prevColors) => ({
      ...prevColors,
      [key]: color.hex,
    }));
  };

  const toggleColorPicker = (key) => {
    setShowColorPicker((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleHexInputChange = (e, key) => {
    const value = e.target.value;
    // Allow typing partial hex codes (e.g., '#FFF') and real-time color change
    setColors((prevColors) => ({
      ...prevColors,
      [key]: value,
    }));
  
    // Validate full hex color after typing is complete
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColors((prevColors) => ({
        ...prevColors,
        [key]: value,
      }));
    }
  };
  

  const handleClickAway = (key) => {
    setShowColorPicker((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };

  const resetColors = () => {
    setColors(initialColors); 
  };

  const saveChanges = async () => {
    if (!selectedRepo) {
      console.error('Repository ID not found');
      return;
    }
  
    try {
      const response = await mobileAppService.updateMobileAppDesignByRepoId(selectedRepo._id, colors);
      console.log('Theme settings saved:', response.data);
      alert('App design updated successfully');

    } catch (error) {
      console.error('Error saving theme settings:', error);
    }
  };

  const renderColorInput = (items) => {
    return items.map((item) => (
      <Grid2 item xs={12} sm={6} md={1.5} key={item.key}>
        <Box position="relative" mb={2}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundColor: colors[item.key],
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: 1,
              }}
              onClick={() => toggleColorPicker(item.key)}
            />
            <TextField
            label={item.label}
            value={colors[item.key]}
            size="small"
            onChange={(e) => handleHexInputChange(e, item.key)}  // Handle manual hex input
            sx={{
              maxWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          </Box>
          {showColorPicker[item.key] && (
            <ClickAwayListener onClickAway={() => handleClickAway(item.key)}>
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  mt: 1,
                }}
              >
                <SketchPicker
                  color={colors[item.key]}
                  onChangeComplete={(color) => handleColorChange(color, item.key)}
                />
              </Box>
            </ClickAwayListener>
          )}
        </Box>
      </Grid2>
    ));
  };

  return (
    <Box sx={{ padding: 2, marginTop: 10 }}>
      <Typography variant="h4" gutterBottom>
        App Design
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
        Customize your app's appearance by selecting colors and uploading fonts that showcase your
        brand to users.
      </Typography>

      {/* Theme Tabs */}
      <Tabs
        value={theme}
        onChange={handleThemeChange}
        aria-label="App Colors"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Light Theme Colors" value="light" />
        <Tab label="Dark Theme Colors" value="dark" />
      </Tabs>

      {/* App Background */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          App Background
        </Typography>
        <Grid2 container spacing={2}>
          {renderColorInput([
            { label: 'Background Color', key: 'backgroundColor' },
            { label: 'Secondary Background Color', key: 'secondaryBackgroundColor' },
          ])}
        </Grid2>
      </Box>

      {/* Text Colors */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Text
        </Typography>
        <Grid2 container spacing={2}>
          {renderColorInput([
            { label: 'Main Text Color', key: 'mainTextColor' },
            { label: 'Title Text Color', key: 'titleTextColor' },
            { label: 'Important Info Text Color', key: 'importantInformationTextColor' },
          ])}
        </Grid2>
      </Box>

      {/* Accent Colors */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Accent
        </Typography>
        <Grid2 container spacing={2}>
          {renderColorInput([
            { label: 'Accent Color', key: 'accentColor' },
            { label: 'Secondary Accent Color', key: 'secondaryAccentColor' },
          ])}
        </Grid2>
      </Box>

      {/* Bottom Bar Colors */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Bottom Bar
        </Typography>
        <Grid2 container spacing={2}>
          {renderColorInput([
            { label: 'Background Color', key: 'bottomBarBackgroundColor' },
            { label: 'Selected Icon Color', key: 'bottomBarSelectedIconColor' },
            { label: 'Unselected Icon Color', key: 'bottomBarUnselectedIconColor' },
          ])}
        </Grid2>
      </Box>

      {/* Top Bar Colors */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Top Bar
        </Typography>
        <Grid2 container spacing={2}>
          {renderColorInput([
            { label: 'Background Color', key: 'topBarBackgroundColor' },
            { label: 'Icon & Text Color', key: 'topBarIconTextColor' },
          ])}
        </Grid2>
      </Box>

      {/* Status Bar Theme */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Status Bar Theme
        </Typography>
        <RadioGroup
          row
          value={colors.statusBarTheme}
          onChange={(e) => setColors({ ...colors, statusBarTheme: e.target.value })}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </Box>

      <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
        <Grid2 item xs={12} sm={6}>
          <Button variant="contained" color="primary" fullWidth onClick={saveChanges}>
            Save Changes
          </Button>
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <Button variant="outlined" color="secondary" fullWidth onClick={resetColors}>
            Reset to Default
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AppDesign;