// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AppDesign from './pages/AppDesign'; // Import the new AppDesign page
import authService from './services/authService';

const App = () => {
  const isAuthenticated = authService.isAuthenticated();
  const location = useLocation(); // Get the current path

  // Check if the current route is the login page
  const shouldShowSidebar = location.pathname !== '/login';

  return (
    <div style={{ display: 'flex' }}>
      {/* Conditionally render Sidebar only if the user is not on the login page */}
      {isAuthenticated && shouldShowSidebar && <Sidebar />}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          {/* Redirect to login if user is not authenticated */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          {/* Route for App Design */}
          <Route
            path="/app-design"
            element={isAuthenticated ? <AppDesign /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
