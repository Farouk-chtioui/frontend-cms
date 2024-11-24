import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import AppDesign from './pages/AppDesign';
import AppLayout from './pages/AppLayout';
import authService from './services/authService';
import { Provider } from 'react-redux';
import store from './redux/store';

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
            <Route path="/" element={<Navigate to={isAuthenticated ? "/app-design" : "/login"} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app-design" element={isAuthenticated ? <AppDesign /> : <Navigate to="/login" />} />
            <Route path="/app-layout" element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default AppWrapper;
