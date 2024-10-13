// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import DashboardLayout from '../layouts/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if user is authenticated, otherwise redirect to login
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <h2>Welcome to the Dashboard!</h2>
      {/* Add your dashboard content here */}
    </DashboardLayout>
  );
};

export default Dashboard;
