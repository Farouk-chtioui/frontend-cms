import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RepoProvider } from './context/RepoContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RepoProvider>
    <App />
  </RepoProvider>,
  document.getElementById('root')
);