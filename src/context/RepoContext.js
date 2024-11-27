import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const RepoContext = createContext();

export const RepoProvider = ({ children }) => {
  const initialState = localStorage.getItem("selectedRepo");
  const [selectedRepo, setSelectedRepo] = useState(() => {
    try {
      return initialState ? JSON.parse(initialState) : null;
    } catch (error) {
      console.error("Failed to parse selectedRepo from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");
    const storedRepo = JSON.parse(localStorage.getItem("selectedRepo"));

    // Reset selectedRepo if it doesn't belong to the current user
    if (storedRepo && storedRepo.ownerId !== currentUserId) {
      setSelectedRepo(null);
      localStorage.removeItem("selectedRepo");
    }
  }, []);

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
