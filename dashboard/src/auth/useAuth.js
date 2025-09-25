// dashboard/src/auth/useAuth.js
import { useEffect, useState, createContext, useContext } from "react";
import client from "../api/client"; // adjust path if needed

const AuthContext = createContext();

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    setLoading(true);

    // always try to attach token from localStorage if present
    const token = localStorage.getItem("tf_token");
    if (token) {
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const maxAttempts = 4;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const res = await client.get("/auth/me");
        setUser(res.data.user);
        setLoading(false);
        return;
      } catch (err) {
        console.warn(`[useAuth] /auth/me attempt ${attempt} failed`, err?.response?.status);

        if (attempt === maxAttempts) {
          // after all attempts, give up
          setUser(null);
          setLoading(false);
          return;
        }

        // wait a bit before retrying (100ms, 200ms, 300ms…)
        await new Promise((r) => setTimeout(r, 100 * attempt));
      }
    }
  };

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    try {
      await client.post("/auth/logout");
    } catch (e) {
      // ignore server errors on logout
      console.warn("Logout call failed:", e);
    }
    localStorage.removeItem("tf_token");
    setUser(null);
    // redirect to landing login with hash
    const landing = process.env.REACT_APP_LANDING_URL || window.location.origin;
    window.location.href = `${landing}/#/login`;
  };

  return {
    user,
    loading,
    fetchMe,
    logout,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
