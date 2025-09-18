// dashboard/src/auth/useAuth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in

  const fetchMe = async () => {
    try {
      const res = await client.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => { fetchMe(); }, []);

  const logout = async () => {
    try {
      await client.post('/auth/logout');
    } catch (err) {
      // ignore
    }
    setUser(null);
    // redirect back to landing login
    window.location.href = 'http://localhost:3001/login';
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
