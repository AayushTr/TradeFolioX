// src/components/TopBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function TopBar() {
  const { user, logout } = useAuth();
  const loc = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/allshares", label: "All Shares" },
    { to: "/dashboard/orders", label: "Orders" },
    { to: "/dashboard/holdings", label: "Holdings" },
    { to: "/dashboard/positions", label: "Positions" },
    { to: "/dashboard/funds", label: "Funds" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return loc.pathname === "/dashboard" || loc.pathname === "/dashboard/";
    }
    return loc.pathname.startsWith(path);
  };

  // get user display (falls back gracefully)
  const userLabel = user?.name || user?.email || "User";

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <Link to="/dashboard" className="brand-link" aria-label="TradeFoliox home">
          <span className="brand-logo">TradeFoliox</span>
        </Link>
      </div>

      <nav className="topbar-nav" aria-label="Main navigation">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${isActive(l.to) ? "active" : ""}`}
            aria-current={isActive(l.to) ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="topbar-right">
        <div className="profile-area" title={userLabel}>
          <div className="profile-avatar" aria-hidden>
            {String(userLabel)
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
          <div className="profile-name">{userLabel}</div>
        </div>

        <button
          className="btn logout-btn"
          onClick={logout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
