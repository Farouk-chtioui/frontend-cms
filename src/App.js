// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AppDesign from './pages/AppDesign';
import authService from './services/authService';

const App = () => {
  const isAuthenticated = authService.isAuthenticated();
  const location = useLocation(); // This needs to be inside the Router

  const shouldShowSidebar = location.pathname !== '/login';

  return (
    <div style={{ display: 'flex' }}>
      {isAuthenticated && shouldShowSidebar && <Sidebar />}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app-design" element={isAuthenticated ? <AppDesign /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

// Make sure the entire app is wrapped in BrowserRouter
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
