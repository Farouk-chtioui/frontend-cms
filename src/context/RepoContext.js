import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const RepoContext = createContext();

export const RepoProvider = ({ children }) => {
  // Retrieve initial state from localStorage
  const initialState = localStorage.getItem("selectedRepo");
  const [selectedRepo, setSelectedRepo] = useState(() => {
    try {
      return initialState ? JSON.parse(initialState) : null; // Default to null if no repo is selected
    } catch (error) {
      console.error("Failed to parse selectedRepo from localStorage:", error);
      return null; // Fallback to null
    }
  });

  useEffect(() => {
    // Update localStorage whenever selectedRepo changes
    if (selectedRepo) {
      localStorage.setItem("selectedRepo", JSON.stringify(selectedRepo));
    } else {
      localStorage.removeItem("selectedRepo");
    }
  }, [selectedRepo]);

  // Rename `setSelectedRepo` to `updateSelectedRepo` for consistency
  const updateSelectedRepo = (repo) => {
    setSelectedRepo(repo);
  };

  return (
    <RepoContext.Provider value={{ selectedRepo, updateSelectedRepo }}>
      {children}
    </RepoContext.Provider>
  );
};

// Custom hook to use the RepoContext
export const useRepo = () => {
  return useContext(RepoContext);
};
