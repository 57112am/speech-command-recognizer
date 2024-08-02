// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// A PrivateRoute component that takes a component and other props
const PrivateRoute = ({ element: Component }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Route
      element={token ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;