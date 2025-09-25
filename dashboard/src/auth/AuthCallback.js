// dashboard/src/pages/AuthCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client"; // adjust path if your client is at ../api/client

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // window.location.hash looks like "#/auth/callback?token=XYZ"
        const frag = window.location.hash || "";
        const qIndex = frag.indexOf("?");
        const queryString = qIndex >= 0 ? frag.slice(qIndex + 1) : "";
        const params = new URLSearchParams(queryString);
        const token = params.get("token");

        if (!token) {
          // nothing to do — go to login
          navigate("/login");
          return;
        }

        // Save the token in dashboard origin localStorage
        try { localStorage.setItem("tf_token", token); } catch (e) { /* ignore */ }

        // Set axios default Authorization header (for subsequent requests)
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Optionally call /auth/me to prime user state
        try {
          await client.get("/auth/me"); // server side will accept Authorization header (we made middleware accept it)
        } catch (err) {
          // ignore: if /me fails, we still proceed to dashboard (user may be unauthenticated server-side)
          console.warn("AuthCallback /auth/me failed:", err?.response?.data || err?.message);
        }

        // finally navigate to actual dashboard route
        navigate("/dashboard");
      } catch (err) {
        console.error("AuthCallback error:", err);
        navigate("/login");
      }
    })();
  }, [navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h3>Signing you in…</h3>
      <p>Please wait — redirecting to your dashboard.</p>
    </div>
  );
}
