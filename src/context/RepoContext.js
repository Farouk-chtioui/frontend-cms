import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const RepoContext = createContext();

export const RepoProvider = ({ children }) => {
  // Try to retrieve the initial state from localStorage
  const initialState = localStorage.getItem("selectedRepo");
  const [selectedRepo, setSelectedRepo] = useState(() => {
    try {
      return initialState ? JSON.parse(initialState) : {}; // Provide a default value
    } catch (error) {
      console.error("Failed to parse selectedRepo from localStorage:", error);
      return {}; // Fallback in case of error
    }
  });

  useEffect(() => {
    // Update localStorage whenever selectedRepo changes
    localStorage.setItem("selectedRepo", JSON.stringify(selectedRepo));
  }, [selectedRepo]);

  return (
    <RepoContext.Provider value={{ selectedRepo, setSelectedRepo }}>
      {children}
    </RepoContext.Provider>
  );
};

// Custom hook to use the RepoContext
export const useRepo = () => {
  return useContext(RepoContext);
};
