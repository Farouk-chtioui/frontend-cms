import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RepoProvider } from './context/RepoContext';
import { ThemeProvider } from './context/ThemeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
  <RepoProvider>
    <App />
  </RepoProvider>
  </ThemeProvider>,
  document.getElementById('root')
);