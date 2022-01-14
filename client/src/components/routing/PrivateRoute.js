import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Deny access if user is not logged in
const PrivateRoute = ({ component: Component }) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = auth;
  if (loading) return <h1 className="container">Loading...</h1>;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
