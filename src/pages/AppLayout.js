import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Grid2,
  Paper,
  IconButton,
  Modal,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Sample icons for Bottom Bar
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

// Available icons for tab selection
const iconOptions = {
  Home: <HomeIcon />,
  Offers: <LocalOfferIcon />,
  Account: <AccountCircleIcon />,
  Cart: <ShoppingCartIcon />,
  Info: <InfoIcon />,
};

// Modal component for selecting icons and modifying tab name
const TabEditorModal = ({ open, onClose, onSave, tabData }) => {
  const [tabName, setTabName] = useState(tabData?.name || '');
  const [selectedIcon, setSelectedIcon] = useState(tabData?.iconName || '');

  const handleSave = () => {
    onSave({ name: tabName, iconName: selectedIcon });
    onClose();
  };

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
        <Select
          value={selectedIcon}
          onChange={(e) => setSelectedIcon(e.target.value)}
          fullWidth
        >
          {Object.keys(iconOptions).map((iconName) => (
            <MenuItem key={iconName} value={iconName}>
              {iconName}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Drag-and-drop tab component
const DraggableTab = ({ tab, index, moveTab, onEdit, onDelete }) => {
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

  return (
    <Grid2 ref={(node) => ref(drop(node))} item xs={12}>
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
          <IconButton color="primary" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </Grid2>
  );
};

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('appScreens');
  const [bottomBarTabs, setBottomBarTabs] = useState([
    { name: 'Accueil', icon: <HomeIcon />, iconName: 'Home' },
    { name: 'Offres', icon: <LocalOfferIcon />, iconName: 'Offers' },
    { name: 'Mon Compte', icon: <AccountCircleIcon />, iconName: 'Account' },
    { name: 'Panier', icon: <ShoppingCartIcon />, iconName: 'Cart' },
    { name: 'Infos', icon: <InfoIcon />, iconName: 'Info' },
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
    if (editingTabIndex !== null) {
      const updatedTabs = [...bottomBarTabs];
      updatedTabs[editingTabIndex] = {
        name: tabData.name,
        icon: iconOptions[tabData.iconName],
        iconName: tabData.iconName,
      };
      setBottomBarTabs(updatedTabs);
    } else {
      setBottomBarTabs((prevTabs) => [
        ...prevTabs,
        { name: tabData.name, icon: iconOptions[tabData.iconName], iconName: tabData.iconName },
      ]);
    }
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

      {/* Bottom Bar Tab */}
      {activeTab === 'bottomBar' && (
        <DndProvider backend={HTML5Backend}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Customize Bottom Bar
            </Typography>

            {/* Bottom Bar Tabs List */}
            <Grid2 container spacing={2}>
              {bottomBarTabs.map((tab, index) => (
                <DraggableTab
                  key={index}
                  tab={tab}
                  index={index}
                  moveTab={moveTab}
                  onEdit={() => handleEditTab(index)}
                  onDelete={() => handleDeleteTab(index)}
                />
              ))}
            </Grid2>

            <Button
              variant="contained"
              onClick={handleAddTab}
              startIcon={<AddIcon />}
              sx={{ marginTop: 2 }}
            >
              Add Tab
            </Button>

            {/* Dynamic Mobile Screen Preview */}
            <Box sx={{ marginTop: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Live Preview
              </Typography>
              <Paper
                sx={{
                  width: '300px',
                  height: '600px',
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
                  <Typography variant="h5" color="textSecondary">
                    App Content Area
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderTop: '1px solid #ddd',
                  }}
                >
                  {bottomBarTabs.map((tab, index) => (
                    <Box key={index} textAlign="center">
                      {tab.icon}
                      <Typography variant="caption">{tab.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </DndProvider>
      )}

      {/* Modal for Editing or Adding Tabs */}
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
