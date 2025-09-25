// dashboard/src/pages/AuthCallback.js
import React, { useEffect, useState } from "react";
import client from "../api/client"; // adjust path if necessary
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const [status, setStatus] = useState("starting");
  const [debug, setDebug] = useState([]);
  const navigate = useNavigate();

  const log = (label, v) => {
    console.log(label, v);
    setDebug((d) => [...d, `${label}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`]);
  };

  useEffect(() => {
    (async () => {
      try {
        log("[AuthCallback] url", window.location.href);
        const frag = window.location.hash || "";
        log("[AuthCallback] hash", frag);

        const qIndex = frag.indexOf("?");
        const query = qIndex >= 0 ? frag.slice(qIndex + 1) : "";
        const params = new URLSearchParams(query);
        const token = params.get("token");
        log("[AuthCallback] parsed token present?", !!token);

        if (!token) {
          setStatus("no-token");
          log("[AuthCallback] No token in fragment; aborting and showing login link");
          return;
        }

        // Save token
        try {
          localStorage.setItem("tf_token", token);
          log("[AuthCallback] stored tf_token in localStorage", true);
        } catch (err) {
          log("[AuthCallback] localStorage write failed", (err && err.message) || err);
        }

        // expose client on window for quick debugging
        try { window.__CLIENT__ = client; } catch(e) { /* ignore */ }

        // Set default auth header
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        log("[AuthCallback] set client.defaults.headers.common.Authorization", client.defaults.headers.common["Authorization"]);

        setStatus("calling-me");
        // Call /auth/me and capture complete response or error
        try {
          const res = await client.get("/auth/me");
          log("[AuthCallback] /auth/me success", res.data);
          setStatus("success");
          // navigate only after success
          navigate("/dashboard");
        } catch (err) {
          // show error details on screen
          const resp = err?.response;
          log("[AuthCallback] /auth/me failed status", resp?.status);
          log("[AuthCallback] /auth/me failed data", resp?.data);
          log("[AuthCallback] request headers sent", err?.config?.headers || client.defaults.headers.common);
          setStatus("me-failed");
        }
      } catch (ex) {
        log("[AuthCallback] unexpected error", ex?.message || ex);
        setStatus("error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h3>Signing you in…</h3>
      <p>Please wait — redirecting to your dashboard.</p>

      <div style={{ marginTop: 24 }}>
        <strong>Status:</strong> {status}
      </div>

      <div style={{ marginTop: 12, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
        Debug log:
        <div style={{ marginTop: 8 }}>
          {debug.map((d, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee", padding: "6px 0" }}>{d}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => { window.location.reload(); }}>Reload</button>
        <button style={{ marginLeft: 8 }} onClick={() => { localStorage.removeItem("tf_token"); }}>Clear tf_token</button>
      </div>
    </div>
  );
}
