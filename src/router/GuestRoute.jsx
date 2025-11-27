import React from 'react';
import  useAuth  from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); 

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;