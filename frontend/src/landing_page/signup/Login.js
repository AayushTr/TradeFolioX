import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import client from "../../api/client"; // ✅ axios instance

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setBusy(true);

      // ✅ call backend login API
      const res = await client.post("/auth/login", form);

      // ✅ store fallback token if backend includes it
      if (res.data?.token) {
        localStorage.setItem("tf_token", res.data.token);
      }

      // ✅ redirect to dashboard app (hash route!)
      const dashboardUrl =
        process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3002";
      window.location.href = `${dashboardUrl}/#/dashboard`;
    } catch (err) {
      setError(err.response?.data?.msg || "Error logging in");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page" aria-labelledby="login-heading">
      <div className="auth-card" role="region" aria-label="Login form">
        <h1 id="login-heading" className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your TradeFoliox account.</p>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {error && <div className="auth-error" role="alert">{error}</div>}

          <label className="field">
            <span className="field-label">Email</span>
            <input
              name="email"
              type="email"
              className="input"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              aria-required="true"
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              name="password"
              type="password"
              className="input"
              value={form.password}
              onChange={onChange}
              placeholder="Your password"
              aria-required="true"
            />
          </label>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label className="remember">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot" className="link-inline">Forgot?</Link>
          </div>

          <div className="form-row">
            <button className="btn-primary" type="submit" disabled={busy}>
              {busy ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="auth-footer">
            <span>New to TradeFoliox?</span>
            <Link to="/signup" className="link-inline">Create an account</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
