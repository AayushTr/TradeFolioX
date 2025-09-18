// FeaturesPage.js
import React from "react";
import "./FeaturesPage.css";

const FEATURES = [
  { id: 1, title: "Zero hidden fees", desc: "Flat pricing with no surprises." },
  { id: 2, title: "Smart charts", desc: "Interactive, real-time charts with custom indicators." },
  { id: 3, title: "Secure & compliant", desc: "Bank-grade security and full regulatory compliance." },
  { id: 4, title: "One portfolio", desc: "Manage stocks, funds, ETFs, and bonds from one dashboard." },
];

export default function FeaturesPage() {
  return (
    <main className="page features-page" aria-labelledby="features-title">
      <div className="page-container">
        <h1 id="features-title" className="page-title">Features</h1>
        <p className="page-sub">
          Explore the key features that make TradeFoliox simple, transparent, and powerful for investors.
        </p>

        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.id} className="feature-card">
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
