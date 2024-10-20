import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  IconButton,
  Modal,
  TextField,
  Switch,
  FormControlLabel,
  Menu,
  MenuItem,
} from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as Icons from '@mui/icons-material';
import { DeviceFrameset } from 'react-device-frameset'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import 'react-device-frameset/styles/marvel-devices.min.css'
import 'react-device-frameset/styles/device-selector.min.css'
const TabEditorModal = ({ open, onClose, onSave, tabData }) => {
  const [tabName, setTabName] = useState(tabData?.name || '');
  const [selectedIcon, setSelectedIcon] = useState(tabData?.iconName || '');
  const [iconOptions, setIconOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const icons = Object.keys(Icons).map((iconName) => ({
      name: iconName,
      component: Icons[iconName],
    }));
    setIconOptions(icons);
  }, []);

  const handleSave = () => {
    onSave({ name: tabName, iconName: selectedIcon });
    onClose();
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

// Draggable tab component
const DraggableTab = ({ tab, index, moveTab, onEdit, onDelete, onToggleVisibility, onSetHomeScreen }) => {
  const [, ref] = useDrag({
    type: 'TAB',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TAB',
    hover: (item) => {
      if (item.index !== index) {
        moveTab(item.index, index);
        item.index = index;
      }
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid ref={(node) => ref(drop(node))} item xs={12}>
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {tab.icon}
          <Typography sx={{ marginLeft: 2 }}>{tab.name}</Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={<Switch checked={tab.visible} onChange={() => onToggleVisibility(index)} />}
            label="Visible"
          />
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { onSetHomeScreen(index); handleMenuClose(); }}>Set as Home</MenuItem>
            <MenuItem onClick={() => { onDelete(index); handleMenuClose(); }}>Delete</MenuItem>
          </Menu>
          <IconButton color="primary" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  );
};

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('appScreens');
  const [bottomBarTabs, setBottomBarTabs] = useState([
    { name: 'Home', icon: <Icons.Home />, iconName: 'Home', visible: true, isHome: false },
    { name: 'Offers', icon: <Icons.LocalOffer />, iconName: 'LocalOffer', visible: true, isHome: false },
    { name: 'Account', icon: <Icons.AccountCircle />, iconName: 'AccountCircle', visible: true, isHome: false },
    { name: 'Cart', icon: <Icons.ShoppingCart />, iconName: 'ShoppingCart', visible: true, isHome: false },
    { name: 'Info', icon: <Icons.Info />, iconName: 'Info', visible: true, isHome: false },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTabIndex, setEditingTabIndex] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const moveTab = (fromIndex, toIndex) => {
    const updatedTabs = [...bottomBarTabs];
    const [movedTab] = updatedTabs.splice(fromIndex, 1);
    updatedTabs.splice(toIndex, 0, movedTab);
    setBottomBarTabs(updatedTabs);
  };

  const handleAddTab = () => {
    if (bottomBarTabs.length >= 5) {
      alert('Maximum number of tabs (5) reached.');
      return;
    }
    setModalOpen(true);
    setEditingTabIndex(null);
  };

  const handleEditTab = (index) => {
    setModalOpen(true);
    setEditingTabIndex(index);
  };

  const handleDeleteTab = (index) => {
    const updatedTabs = bottomBarTabs.filter((_, i) => i !== index);
    setBottomBarTabs(updatedTabs);
  };

  const handleSaveTab = (tabData) => {
    const iconComponent = tabData.iconName ? React.createElement(Icons[tabData.iconName]) : bottomBarTabs[editingTabIndex].icon;
    if (editingTabIndex !== null) {
      const updatedTabs = [...bottomBarTabs];
      updatedTabs[editingTabIndex] = {
        ...updatedTabs[editingTabIndex],
        name: tabData.name,
        icon: iconComponent,
        iconName: tabData.iconName || updatedTabs[editingTabIndex].iconName,
      };
      setBottomBarTabs(updatedTabs);
    } else {
      setBottomBarTabs((prevTabs) => [
        ...prevTabs,
        { name: tabData.name, icon: iconComponent, iconName: tabData.iconName, visible: true, isHome: false },
      ]);
    }
  };

  const handleToggleVisibility = (index) => {
    const updatedTabs = [...bottomBarTabs];
    updatedTabs[index].visible = !updatedTabs[index].visible;
    setBottomBarTabs(updatedTabs);
  };

  const handleSetHomeScreen = (index) => {
    const updatedTabs = bottomBarTabs.map((tab, i) => ({
      ...tab,
      isHome: i === index,
    }));
    setBottomBarTabs(updatedTabs);
  };

  return (
    <Box sx={{ padding: 2, marginTop: 10 }}>
      <Typography variant="h4" gutterBottom>
        App Layout
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="App Layout Tabs"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="App Screens" value="appScreens" />
        <Tab label="Bottom Bar" value="bottomBar" />
        <Tab label="Onboarding" value="onboarding" />
      </Tabs>

      {activeTab === 'bottomBar' && (
        <DndProvider backend={HTML5Backend}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Customize Bottom Bar
              </Typography>

              <Grid container spacing={2}>
                {bottomBarTabs.map((tab, index) => (
                  <DraggableTab
                    key={index}
                    tab={tab}
                    index={index}
                    moveTab={moveTab}
                    onEdit={() => handleEditTab(index)}
                    onDelete={() => handleDeleteTab(index)}
                    onToggleVisibility={handleToggleVisibility}
                    onSetHomeScreen={handleSetHomeScreen}
                  />
                ))}
              </Grid>

              <Button
                variant="contained"
                onClick={handleAddTab}
                startIcon={<AddIcon />}
                sx={{ marginTop: 2 }}
              >
                Add Tab
              </Button>
              {bottomBarTabs.length >= 5 && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                  Maximum number of tabs (5) reached.
                </Typography>
              )}
            </Box>

            <Box sx={{ marginLeft: 4, textAlign: 'center', flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Live Preview
              </Typography>
              <DeviceFrameset
                device="iPhone X" // Correct deviceType prop
                color="black"
              >
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
          </Box>
        </DndProvider>
      )}

      <TabEditorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTab}
        tabData={editingTabIndex !== null ? bottomBarTabs[editingTabIndex] : null}
      />
    </Box>
  );
};

export default AppLayout;
