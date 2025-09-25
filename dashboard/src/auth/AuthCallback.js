// dashboard/src/pages/AuthCallback.js
import React, { useEffect, useState } from "react";
import client from "../api/client"; // adjust path if needed
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
          log("[AuthCallback] No token in fragment; aborting");
          return;
        }

        try {
          localStorage.setItem("tf_token", token);
          log("[AuthCallback] stored tf_token in localStorage", true);
        } catch (err) {
          log("[AuthCallback] localStorage write failed", err?.message || err);
        }

        try { window.__CLIENT__ = client; } catch (e) {}

        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        log("[AuthCallback] set Authorization header", client.defaults.headers.common["Authorization"]?.slice(0,20) || "set");

        // Retry /auth/me with exponential backoff
        const maxAttempts = 5;
        let attempt = 0;
        let lastError = null;
        setStatus("calling-me");

        while (attempt < maxAttempts) {
          attempt += 1;
          log(`[AuthCallback] attempt ${attempt} / ${maxAttempts} to call /auth/me`, "");
          try {
            const res = await client.get("/auth/me");
            log("[AuthCallback] /auth/me success", res.data);
            setStatus("success");
            // navigate only after success
            navigate("/dashboard");
            return;
          } catch (err) {
            lastError = err;
            const statusCode = err?.response?.status;
            log(`[AuthCallback] /auth/me attempt ${attempt} failed status`, statusCode);
            log(`[AuthCallback] /auth/me attempt ${attempt} data`, err?.response?.data || err.message);
            // if 4xx token errors like 401, we may still retry a few times in case of transient failure, but break if it's clearly invalid
            if (statusCode === 401 && attempt >= maxAttempts) {
              break;
            }
            // wait exponential backoff (100ms, 200ms, 400ms, ...)
            const wait = 100 * Math.pow(2, attempt - 1);
            await new Promise((r) => setTimeout(r, wait));
          }
        }

        log("[AuthCallback] all attempts failed", lastError?.response?.data || lastError?.message || lastError);
        setStatus("me-failed");
        // do not auto-redirect immediately — show user the log; they can retry by clicking Reload
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

      <div style={{ marginTop: 16 }}>
        <strong>Status:</strong> {status}
      </div>

      <div style={{ marginTop: 12, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
        <strong>Debug log:</strong>
        <div style={{ marginTop: 8 }}>
          {debug.map((d, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee', padding: '6px 0" }}>{d}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => window.location.reload()}>Reload</button>
        <button style={{ marginLeft: 8 }} onClick={() => { localStorage.removeItem("tf_token"); }}>Clear tf_token</button>
      </div>
    </div>
  );
}
