import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  InputAdornment,
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const TabEditorModal = ({ open, onClose, onSave, tabData }) => {
  const [tabName, setTabName] = useState(tabData?.name || '');
  const [selectedIcon, setSelectedIcon] = useState(tabData?.iconName || '');
  const [iconOptions, setIconOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [iconStyle, setIconStyle] = useState('regular');

  useEffect(() => {
    let icons;
    switch (iconStyle) {
      case 'outlined':
        icons = Object.keys(Icons).filter(iconName => iconName.endsWith('Outlined')).map((iconName) => ({
          name: iconName,
          component: Icons[iconName],
        }));
        break;
      case 'sharp':
        icons = Object.keys(Icons).filter(iconName => iconName.endsWith('Sharp')).map((iconName) => ({
          name: iconName,
          component: Icons[iconName],
        }));
        break;
      default:
        icons = Object.keys(Icons).filter(iconName => !iconName.endsWith('Outlined') && !iconName.endsWith('Sharp')).map((iconName) => ({
          name: iconName,
          component: Icons[iconName],
        }));
    }
    setIconOptions(icons);
  }, [iconStyle]);

  const handleSave = () => {
    onSave({ name: tabName, iconName: selectedIcon, uploadedImage });
    onClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setSelectedIcon('uploadedImage');
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredIcons = iconOptions.filter((icon) =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {tabData ? 'Edit Tab' : 'Add Tab'}
        </Typography>
        <TextField
          label="Tab Name"
          value={tabName}
          onChange={(e) => setTabName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Search Icons"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Button variant={iconStyle === 'regular' ? 'contained' : 'outlined'} onClick={() => setIconStyle('regular')}>
            Regular
          </Button>
          <Button variant={iconStyle === 'outlined' ? 'contained' : 'outlined'} onClick={() => setIconStyle('outlined')}>
            Outlined
          </Button>
          <Button variant={iconStyle === 'sharp' ? 'contained' : 'outlined'} onClick={() => setIconStyle('sharp')}>
            Sharp
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{ marginRight: 2 }}
          >
            Upload Icon
            <input
              type="file"
              accept="image/png"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded Icon"
              style={{ width: 40, height: 40, borderRadius: 4 }}
            />
          )}
        </Box>
        <Box
          sx={{
            maxHeight: 200,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
            gap: 1,
          }}
        >
          {filteredIcons.map((icon) => (
            <Box
              key={icon.name}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                padding: 1,
                border: selectedIcon === icon.name ? '2px solid blue' : '1px solid gray',
                borderRadius: 1,
              }}
              onClick={() => setSelectedIcon(icon.name)}
            >
              {React.createElement(icon.component)}
            </Box>
          ))}
          {uploadedImage && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                padding: 1,
                border: selectedIcon === 'uploadedImage' ? '2px solid blue' : '1px solid gray',
                borderRadius: 1,
              }}
              onClick={() => setSelectedIcon('uploadedImage')}
            >
              <img src={uploadedImage} alt="Uploaded Icon" style={{ width: '100%' }} />
            </Box>
          )}
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TabEditorModal;