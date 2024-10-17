import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';  
import Login from './pages/Login';
import AppDesign from './pages/AppDesign';
import authService from './services/authService';

const App = () => {
  const isAuthenticated = authService.isAuthenticated();
  const location = useLocation(); 

  const shouldShowSidebar = location.pathname !== '/login';
  const shouldShowTopbar = location.pathname !== '/login';  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {isAuthenticated && shouldShowTopbar && <Topbar />}

      <div style={{ display: 'flex', flexGrow: 1 }}>
        {isAuthenticated && shouldShowSidebar && <Sidebar />}

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

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
