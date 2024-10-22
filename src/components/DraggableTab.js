import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Grid,
  Paper,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

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

export default DraggableTab;