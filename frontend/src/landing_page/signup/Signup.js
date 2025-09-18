// Signup.js
import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // validation: NO minimum password length
  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
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
      // TODO: replace this with your real signup API call
      // Example:
      // await api.signup(form);
      await new Promise((r) => setTimeout(r, 700)); // demo delay
      console.log("SIGNUP payload:", form);

      // After successful signup, redirect to login page
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="input"
              placeholder="Your full name"
              aria-required="true"
            />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="input"
              placeholder="you@example.com"
              aria-required="true"
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="input"
              placeholder="Choose a password"
              aria-required="true"
            />
          </label>

          <div className="form-row">
            <button
              type="submit"
              className="btn-primary"
              disabled={busy}
              aria-disabled={busy}
            >
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
