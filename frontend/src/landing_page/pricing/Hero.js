// src/landing_page/pricing/PricingPage.js
import React from "react";
import { Link } from "react-router-dom";
import Brokerage from "./Brokerage";

const teal = "#0D9488";
const accent = "#F59E0B";

export default function PricingPage() {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#1f2937" }}>
      <header style={{ padding: "48px 24px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, margin: 0, fontWeight: 700 }}>Pricing</h1>
        <p style={{ color: "#6b7280", marginTop: 12, fontSize: 18 }}>
          Free equity investments and flat ₹20 trading and F&O trades
        </p>
        <hr style={{ margin: "28px auto", width: "80%", borderColor: "#e6e6e6" }} />
      </header>

      {/* Cards */}
      <section
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          alignItems: "stretch",
          padding: "28px 40px 64px",
          flexWrap: "wrap",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Card
          title="Free equity delivery"
          description="All equity delivery investments (NSE, BSE) are absolutely free — ₹0 brokerage."
        >
          <LargeSymbol symbol="₹0" />
        </Card>

        <Card
          title="Intraday and F&O trades"
          description="Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity."
        >
          <LargeSymbol symbol="₹20" />
        </Card>

        <Card
          title="Free direct MF"
          description="All direct mutual fund investments are commission-free — ₹0 commissions & DP charges."
        >
          <LargeSymbol symbol="₹0" />
        </Card>
      </section>

      {/* CTA / Signup */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 40,
          padding: "40px 48px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        
      </section>


      
    </div>
  );
}

/* Small subcomponents */

function Card({ title, description, children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 28,
        width: 320,
        boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
        <div style={{ flexShrink: 0 }}>{children}</div>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: 14 }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

function LargeSymbol({ symbol }) {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 12,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 18px rgba(245,158,11,0.06)",
      }}
    >
      <span style={{ color: accent, fontSize: 28, fontWeight: 700 }}>{symbol}</span>
    </div>
  );
}
