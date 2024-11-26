import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import * as Icons from '@mui/icons-material';
import TabEditorModal from '../components/TabEditorModal';
import BottomBar from '../components/BottomBar';
import LivePreview from '../components/LivePreview';

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('bottomBar');
  const [bottomBarTabs, setBottomBarTabs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTabIndex, setEditingTabIndex] = useState(null);

  // Fetch layout on component mount
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await axios.get('http://localhost:3001/app-layout/default');
        if (response.data?.bottomBarTabs) {
          const updatedTabs = response.data.bottomBarTabs.map((tab) => ({
            ...tab,
            icon: Icons[tab.iconName]
              ? React.createElement(Icons[tab.iconName])
              : React.createElement(Icons.HelpOutline), // Fallback icon
          }));
          setBottomBarTabs(updatedTabs);
        } else {
          console.error('No default layout found.');
        }
      } catch (error) {
        console.error('Error fetching default layout:', error);
      }
    };

    fetchLayout();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Save tab handler
  const handleSaveTab = (tabData) => {
    const iconComponent = Icons[tabData.iconName]
      ? React.createElement(Icons[tabData.iconName])
      : React.createElement(Icons.HelpOutline); // Fallback icon
  
    if (editingTabIndex !== null) {
      const updatedTabs = [...bottomBarTabs];
      updatedTabs[editingTabIndex] = {
        ...updatedTabs[editingTabIndex],
        name: tabData.name,
        icon: iconComponent,
        iconName: tabData.iconName,
      };
      setBottomBarTabs(updatedTabs);
    } else {
      setBottomBarTabs((prevTabs) => [
        ...prevTabs,
        { name: tabData.name, icon: iconComponent, iconName: tabData.iconName, visible: true, isHome: false },
      ]);
    }
  };
  

  // Save changes handler
  const handleSaveChanges = async () => {
    try {
      // Construct the payload without layoutType
      const payload = {
        bottomBarTabs: bottomBarTabs.map((tab) => ({
          name: tab.name,
          iconName: tab.iconName,
          visible: tab.visible,
          isHome: tab.isHome,
        })),
      };
  
      console.log('Payload being sent:', payload); // Debug payload structure
  
      const response = await axios.put('http://localhost:3001/app-layout/update', payload);
  
      if (response.status === 200) {
        alert('Layout updated successfully!');
      } else {
        throw new Error('Failed to update layout.');
      }
    } catch (error) {
      console.error('Error updating layout:', error.response?.data || error.message);
      alert('Failed to update layout.');
    }
  };
  
  
  
  

  // Reset layout to default handler
  const handleResetToDefault = async () => {
    try {
      const response = await axios.post('http://localhost:3001/app-layout/reset');
      if (response.data?.bottomBarTabs) {
        const updatedTabs = response.data.bottomBarTabs.map((tab) => ({
          ...tab,
          icon: Icons[tab.iconName]
            ? React.createElement(Icons[tab.iconName])
            : React.createElement(Icons.HelpOutline), // Fallback icon
        }));
        setBottomBarTabs(updatedTabs);
        alert('Layout reset to default successfully!');
      } else {
        console.error('Default layout data is missing.');
      }
    } catch (error) {
      console.error('Error resetting layout to default:', error);
      alert('Failed to reset layout to default.');
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

      {activeTab === 'bottomBar' && (
        <DndProvider backend={HTML5Backend}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <BottomBar
              bottomBarTabs={bottomBarTabs}
              setBottomBarTabs={setBottomBarTabs}
              setModalOpen={setModalOpen}
              setEditingTabIndex={setEditingTabIndex}
            />
            <LivePreview bottomBarTabs={bottomBarTabs} />
          </Box>
        </DndProvider>
      )}

      <TabEditorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTab}
        tabData={editingTabIndex !== null ? bottomBarTabs[editingTabIndex] : null}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleResetToDefault}>
          Set to Default
        </Button>
      </Box>
    </Box>
  );
};

export default AppLayout;
