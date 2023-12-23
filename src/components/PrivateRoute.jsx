import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, path }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
