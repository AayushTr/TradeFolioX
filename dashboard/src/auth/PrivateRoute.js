// dashboard/src/auth/PrivateRoute.js
import React from 'react';
import useAuth from './useAuth';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // still checking auth
  if (user === undefined) return <div>Loading...</div>;

  if (user === null) {
    // go to landing login (hard redirect)
    window.location.href = 'http://localhost:3001/login';
    return null;
  }

  return children;
}
