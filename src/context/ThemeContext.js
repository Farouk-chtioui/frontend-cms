// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState({
    backgroundColor: '#FFACC',
    secondaryBackgroundColor: '#6D1E1E',
    mainTextColor: '#FFFFFF',
    titleTextColor: '#29C00',
    importantInformationTextColor: '#00BC78',
    accentColor: '#7A7AFF',
    secondaryAccentColor: '#8400F6',
    bottomBarBackgroundColor: '#000000',
    bottomBarSelectedIconColor: '#F9FFC3',
    bottomBarUnselectedIconColor: '#FFFFFF',
    topBarBackgroundColor: '#FF2929',
    topBarIconTextColor: '#FFFFFF',
    statusBarTheme: 'light',
  });

  return (
    <ThemeContext.Provider value={{ colors, setColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
