// src/landing_page/pricing/Brokerage.js
import React from "react";

export default function Brokerage() {
  const listStyle = {
    color: "#374151",
    lineHeight: 1.7,
    fontSize: 14,
    marginLeft: 18,
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 8px" }}>
      <div style={{ display: "flex", gap: 24, justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 520px", minWidth: 300 }}>
          <h3 style={{ color: "#0D9488", marginBottom: 12 }}>Brokerage calculator</h3>
          <ul style={listStyle}>
            <li>Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.</li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.</li>
            <li>For NRI account (non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower).</li>
            <li>For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
            <li>If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</li>
          </ul>
        </div>

        <div style={{ flex: "0 1 320px", minWidth: 260 }}>
          <h3 style={{ color: "#0D9488", marginBottom: 12 }}>List of charges</h3>
          <ul style={listStyle}>
            <li>Equity delivery: ₹0 per order</li>
            <li>Intraday / F&O: ₹20 per executed order or 0.03% — whichever is lower</li>
            <li>Direct mutual funds: ₹0 (no commission)</li>
            <li>Call & Trade: ₹50 + GST</li>
            <li>Contract note hard copy: ₹20 + courier (if requested)</li>
            <li>Account transfer/payment charges: as applicable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
