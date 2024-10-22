import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DraggableTab from '../components/DraggableTab';

const BottomBar = ({ bottomBarTabs, setBottomBarTabs, setModalOpen, setEditingTabIndex }) => {
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
  );
};

export default BottomBar;