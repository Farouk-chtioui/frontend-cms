import React, { createContext, useState, useContext } from 'react';

const RepoContext = createContext();

export const RepoProvider = ({ children }) => {
  const [selectedRepo, setSelectedRepo] = useState(() => {
    // Get the stored selected repository and userId
    const savedRepo = localStorage.getItem('selectedRepo');
    const savedUserId = localStorage.getItem('savedUserId');
    const currentUserId = localStorage.getItem('userId'); // This is the current logged-in user

    // If the stored userId doesn't match the current one, clear the selectedRepo
    if (savedUserId !== currentUserId) {
      localStorage.removeItem('selectedRepo');
      return null;
    }
    return savedRepo ? JSON.parse(savedRepo) : null;
  });

  const updateSelectedRepo = (repo) => {
    setSelectedRepo(repo);
    localStorage.setItem('selectedRepo', JSON.stringify(repo));
    localStorage.setItem('savedUserId', localStorage.getItem('userId')); // Store userId when repo is selected
  };

  return (
    <RepoContext.Provider value={{ selectedRepo, updateSelectedRepo }}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => useContext(RepoContext);