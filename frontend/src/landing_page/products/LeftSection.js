// LeftSection.js
import React from "react";

export default function LeftSection() {
  return (
    <div style={{ flex: 1, maxWidth: 640 }}>
      <h1 style={{ fontSize: 48, lineHeight: 1.02, margin: 0, color: "#111827", fontWeight: 800 }}>
        Invest smarter with <span style={{ color: "#0D9488" }}>TradeFolio</span>
      </h1>

      <p style={{ marginTop: 18, color: "#6B7280", fontSize: 16, maxWidth: 520 }}>
        A clean, fast dashboard to track your investments, monitor performance and get actionable insights — all in one place.
      </p>

      <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center" }}>
        <a href="/signup" style={{
          backgroundColor: "#0D9488",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 600,
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(13, 148, 136, 0.3)",
          textDecoration: "none"
        }}>
          Open an account
        </a>

        <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = "#learn"; }} style={{
          color: "#0D9488",
          fontWeight: 600,
          textDecoration: "none"
        }}>
          Learn more →
        </a>
      </div>

      <ul style={{ marginTop: 20, paddingLeft: 18, color: "#6B7280", lineHeight: 1.7 }}>
        <li>Real-time portfolio P&L</li>
        <li>Customizable charts & indicators</li>
        <li>Price alerts & watchlists</li>
      </ul>
    </div>
  );
}
