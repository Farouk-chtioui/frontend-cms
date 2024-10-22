import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as Icons from '@mui/icons-material'; // Add this import
import TabEditorModal from '../components/TabEditorModal';
import BottomBar from '../components/BottomBar';
import LivePreview from '../components/LivePreview';

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

  const handleSaveTab = (tabData) => {
    let iconComponent;
    if (tabData.iconName === 'uploadedImage' && tabData.uploadedImage) {
      iconComponent = <img src={tabData.uploadedImage} alt="Custom Icon" style={{ width: '24px', height: '24px' }} />;
    } else {
      iconComponent = tabData.iconName ? React.createElement(Icons[tabData.iconName]) : bottomBarTabs[editingTabIndex].icon;
    }

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
    </Box>
  );
};

export default AppLayout;