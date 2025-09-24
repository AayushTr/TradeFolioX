// dashboard/src/auth/PrivateRoute.js
import React from 'react';
import useAuth from './useAuth';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // still checking auth
  if (user === undefined) return <div>Loading...</div>;

  if (user === null) {
    const landingUrl = process.env.REACT_APP_LANDING_URL || 'http://localhost:3001';
    window.location.href = `${landingUrl}/login`;

    return null;
  }

  return children;
}
