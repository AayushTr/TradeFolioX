// dashboard/src/auth/useAuth.js
import { useEffect, useState, createContext, useContext } from "react";
import client from "../api/client"; // adjust path if needed

const AuthContext = createContext();

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      // try cookie-based request first
      const res = await client.get("/auth/me");
      setUser(res.data.user);
      setLoading(false);
      return;
    } catch (err) {
      // cookie flow failed — try token fallback
      const token = localStorage.getItem("tf_token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res2 = await client.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res2.data.user);
      } catch (err2) {
        console.warn("Auth fallback failed:", err2.response?.data || err2.message);
        setUser(null);
      } finally {
        setLoading(false);
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
