// Signup.js
import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import client from "../../api/client"; // <- add this import

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.password) return "Please choose a password.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      setBusy(true);
      // POST to backend register endpoint
      const res = await client.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      // backend sets cookie and returns user - redirect to login
      navigate("/login");
    } catch (err) {
      // show server message if present
      setError(err.response?.data?.msg || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page" aria-labelledby="signup-heading">
      <div className="auth-card" role="region" aria-label="Signup form">
        <h1 id="signup-heading" className="auth-title">Create your TradeFoliox account</h1>
        <p className="auth-sub">Fast onboarding, predictable pricing, and access to our platform.</p>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {error && <div className="auth-error" role="alert">{error}</div>}

          <label className="field">
            <span className="field-label">Full name</span>
            <input name="name" value={form.name} onChange={onChange} className="input" placeholder="Your full name" />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input name="email" type="email" value={form.email} onChange={onChange} className="input" placeholder="you@example.com" />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input name="password" type="password" value={form.password} onChange={onChange} className="input" placeholder="Choose a password" />
          </label>

          <div className="form-row">
            <button type="submit" className="btn-primary" disabled={busy}>
              {busy ? "Creating..." : "Create account"}
            </button>
          </div>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login" className="link-inline">Log in</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
