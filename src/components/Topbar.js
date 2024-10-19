import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import repositoryService from "../services/repositoryService";
import { useRepo } from '../context/RepoContext';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [repositoryName, setNewRepoName] = useState("");
  const { selectedRepo, updateSelectedRepo } = useRepo();

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('userId not found in localStorage');
        return;
      }
      const response = await repositoryService.getRepositories(userId);
      const fetchedRepos = response.data;

      setProjects(fetchedRepos);

      // Check if selectedRepo exists in the list
      if (selectedRepo && !fetchedRepos.find(repo => repo.repositoryName === selectedRepo.repositoryName)) {
        // If selectedRepo doesn't exist in the list, select the first one
        updateSelectedRepo(fetchedRepos[0]);
      }
    } catch (error) {
      console.error('Failed to fetch repositories', error);
    }
  };

  const handleSelectRepository = (project) => {
    updateSelectedRepo(project);
    handleMenuClose();
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
      if (!userId) {
        console.error('userId is null or undefined');
        return;
      }
      await repositoryService.createRepository({ repositoryName, ownerId: userId });
      fetchRepositories();
      setShowCreateDialog(false);
      setNewRepoName('');
    } catch (error) {
      console.error('Failed to create repository', error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#424242",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
          width: `calc(100% - 240px)`, 
          ml: "240px", 
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: '84px' }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                backgroundColor: "#6D6CFE",
                borderRadius: 2,
                color: "#fff",
                p: 1,
              }}
            >
              ★
            </IconButton>

            <Typography variant="h6" sx={{ ml: 1, fontFamily: "Roboto, sans-serif", color: "#424242" }}>
              Projects
            </Typography>
            <ArrowDropDownIcon
              onClick={handleMenuClick}
              sx={{ cursor: "pointer", ml: 1, color: "#424242" }}
            />

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
                      backgroundColor: "#6D6CFE",
                      borderRadius: 2,
                      color: "#fff",
                      mr: 2,
                      p: 1,
                    }}
                  >
                    ★
                  </IconButton>
                  <Typography>{project.repositoryName}</Typography>
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
                <Typography variant="h6" sx={{ fontFamily: "Roboto, sans-serif", color: "#424242" }}>
                  Selected Repository: {selectedRepo.repositoryName}
                </Typography>
              </Box>
            )}
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: "#424242", fontFamily: "Roboto, sans-serif" }}>
              Welcome, {localStorage.getItem('username')}
            </Typography>
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
            value={repositoryName}
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
