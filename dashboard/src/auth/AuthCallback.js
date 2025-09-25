// dashboard/src/pages/AuthCallback.js
import { useEffect } from "react";
import client from "../api/client"; 
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const frag = window.location.hash || "";
        const qIndex = frag.indexOf("?");
        const query = qIndex >= 0 ? frag.slice(qIndex + 1) : "";
        const params = new URLSearchParams(query);
        const token = params.get("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Save token in localStorage
        localStorage.setItem("tf_token", token);

        // Set Authorization header
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Call /auth/me to verify and then redirect
        await client.get("/auth/me");
        navigate("/dashboard");
      } catch (err) {
        navigate("/login");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h3>Signing you in…</h3>
      <p>Please wait — redirecting to your dashboard.</p>
    </div>
  );
}
