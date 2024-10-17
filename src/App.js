import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';  // Import the Topbar component
import Login from './pages/Login';
import AppDesign from './pages/AppDesign';
import authService from './services/authService';

const App = () => {
  const isAuthenticated = authService.isAuthenticated();
  const location = useLocation();  // This needs to be inside the Router

  const shouldShowSidebar = location.pathname !== '/login';
  const shouldShowTopbar = location.pathname !== '/login';  // Conditionally show Topbar too

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Render Topbar if the user is authenticated and not on the login page */}
      {isAuthenticated && shouldShowTopbar && <Topbar />}

      {/* Main content with Sidebar and Routes */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar is rendered conditionally */}
        {isAuthenticated && shouldShowSidebar && <Sidebar />}

        {/* Main content area */}
        <div style={{ flexGrow: 1, padding: '20px', overflow: 'auto' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/app-design" element={isAuthenticated ? <AppDesign /> : <Navigate to="/login" />} />
          </Routes>
        </div>
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
