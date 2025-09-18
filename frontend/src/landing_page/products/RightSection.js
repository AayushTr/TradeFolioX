// RightSection.js
import React from "react";



export default function RightSection() {
  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img
        src="/media/images/realdashboard.png"
        alt="Dashboard preview"
        style={{
          width: "100%",
          maxWidth: 520,
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          borderRadius: 12,
        }}
      />

      <div style={{
        width: "100%",
        maxWidth: 860,
        borderRadius: 14,
        padding: 28,
        background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))",
        boxShadow: "0 30px 60px rgba(2,6,23,0.08)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        
      </div>
    </div>
  );
}
