import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './App';
import { RepoProvider } from './context/RepoContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <RepoProvider>
      <AppWrapper />
    </RepoProvider>
  </ThemeProvider>
);
