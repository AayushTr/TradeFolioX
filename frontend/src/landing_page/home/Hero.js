// src/components/Hero.js
import React from "react";
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        background: "linear-gradient(to bottom, #F9FAFB, #ffffff)",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Left text block */}
        <div style={{ flex: "1 1 500px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Invest in everything with{" "}
            <span style={{ color: "#0D9488" }}>TradeFoliox</span>
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              marginBottom: "30px",
              lineHeight: "1.6",
            }}
          >
            Online platform to invest in stocks, mutual funds, ETFs, bonds, and
            more — all in one place with unbeatable pricing.
          </p>


          <Link
            to="/signup"
            style={{
              backgroundColor: "#0D9488",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(13, 148, 136, 0.3)",
              transition: "all 0.3s ease",
              display: "inline-block",
              textDecoration: "none",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#F59E0B";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#0D9488";
            }}
          >
            Open an account
        </Link>

        </div>

        {/* Right hero image */}
        <div style={{ flex: "1 1 500px", textAlign: "center" }}>
          <img
            src="media/images/dashboard.png" // replace with your TradeFoliox image
            alt="TradeFoliox dashboard preview"
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(17, 24, 39, 0.1)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
