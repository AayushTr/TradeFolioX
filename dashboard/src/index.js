// dashboard/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/useAuth';
import { GeneralContextProvider } from './components/GeneralContext'; // <-- correct path
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GeneralContextProvider>
        <App />
      </GeneralContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
