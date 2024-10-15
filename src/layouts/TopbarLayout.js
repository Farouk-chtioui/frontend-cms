import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import PublishIcon from "@mui/icons-material/Publish";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import repositoryService from "../services/repositoryService";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [newRepoName, setNewRepoName] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null); // Track selected repository

  // Fetch repositories on component load
  useEffect(() => {
    fetchRepositories();
  }, []);

  // Function to fetch repositories
  const fetchRepositories = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Use 'userId'
      if (!userId) {
        console.error('userId not found in localStorage');
        return;
      }
      const response = await repositoryService.getRepositories(userId);
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch repositories', error);
    }
  };

  // Function to handle repository selection
  const handleSelectRepository = (project) => {
    setSelectedRepo(project); // Set the selected repository
  };

  // Function to delete a repository
  const handleDeleteRepository = async () => {
    if (selectedRepo) {
      try {
        await repositoryService.deleteRepository(selectedRepo._id); // Assuming repository ID is _id
        setSelectedRepo(null); // Reset selection after deletion
        fetchRepositories(); // Refresh the list after deletion
      } catch (error) {
        console.error('Failed to delete repository', error);
      }
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleCreateRepository = async () => {
    try {
      const userId = localStorage.getItem('userId');
      console.log('userId:', userId); // Debugging line to ensure userId is retrieved correctly
  
      if (!userId) {
        console.error('userId is null or undefined');
        return;
      }
  
      await repositoryService.createRepository({ name: newRepoName, owner: userId });
      fetchRepositories();
      setShowCreateDialog(false);
      setNewRepoName('');
    } catch (error) {
      console.error('Failed to create repository', error);
    }
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section - Project Dropdown */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                backgroundColor: "#00d2c6",
                borderRadius: 2,
                color: "#fff",
                p: 1,
              }}
            >
              ★
            </IconButton>

            <Typography variant="h6" sx={{ ml: 1 }}>
              Projects
            </Typography>
            <ArrowDropDownIcon
              onClick={handleMenuClick}
              sx={{ cursor: "pointer", ml: 1 }}
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

              {projects.map((project, index) => (
                <MenuItem key={index} onClick={() => handleSelectRepository(project)}>
                  <IconButton
                    sx={{
                      backgroundColor: "#00d2c6",
                      borderRadius: 2,
                      color: "#fff",
                      mr: 2,
                      p: 1,
                    }}
                  >
                    ★
                  </IconButton>
                  <Typography>{project.name}</Typography>
                </MenuItem>
              ))}

              {/* Add New Repository */}
              <MenuItem
                onClick={() => {
                  setShowCreateDialog(true); // Open the create repo dialog
                  handleMenuClose();
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: "#4caf50",
                    borderRadius: 2,
                    color: "#fff",
                    mr: 2,
                    p: 1,
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Typography>Create New Repository</Typography>
              </MenuItem>
            </Menu>

            {selectedRepo && (
              <Box sx={{ ml: 4 }}>
                <Typography variant="h6">
                  Selected Repository: {selectedRepo.name}
                </Typography>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="secondary"
                  onClick={handleDeleteRepository}
                >
                  Delete Repository
                </Button>
              </Box>
            )}
          </Box>

          {/* Right Section - Publish button and profile */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<PublishIcon />}
              sx={{ backgroundColor: "#4caf50" }}
            >
              Publish
            </Button>

            <Avatar sx={{ bgcolor: "#00d2c6", ml: 2 }}>F</Avatar>
            <Typography sx={{ ml: 1 }}>FaFares</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Create Repository Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      >
        <DialogTitle>Create New Repository</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Repository Name"
            fullWidth
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateRepository} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Topbar;