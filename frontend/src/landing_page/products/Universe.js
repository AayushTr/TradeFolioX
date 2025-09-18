// Universe.js  (Features grid for TradeFoliox)
import React from "react";
import "./Universe.css";

/**
 * Inline SVGs use currentColor so CSS .feature-icon color controls their tint.
 * Add or remove features in the FEATURES array.
 */

const FEATURES = [
  {
    id: 1,
    title: "Zero hidden fees",
    desc: "Clear flat pricing and no surprise charges — know what you pay upfront.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M12 1v22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 8h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 16h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Smart charts & alerts",
    desc: "Interactive charts with custom indicators and real-time alerts so you never miss moves.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M3 17l4-6 4 4 6-10 4 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "One portfolio, many instruments",
    desc: "Stocks, mutual funds, ETFs and bonds — manage everything from a single dashboard.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 10v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M15 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Secure & compliant",
    desc: "Bank-grade security and regulatory compliance so your funds and data are protected.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M12 2l7 4v4c0 5-3 9-7 12-4-3-7-7-7-12V6l7-4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="11" r="2" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "Fast account setup",
    desc: "Start investing quickly with a simple signup flow and guided onboarding.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M3 12h6l3 8 3-16 6 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 6,
    title: "Customer-first support",
    desc: "Responsive support and in-app help to guide you whenever you need it.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14s1.5-2 4-2 4 2 4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

export default function Universe() {
  return (
    <section className="universe-section" aria-labelledby="universe-title">
      <div className="universe-container">
        <div className="universe-header">
          <div>
            <h3 id="universe-title" className="universe-title">Why TradeFoliox?</h3>
            <div className="universe-sub">Key features that make investing simple and transparent.</div>
          </div>
        </div>

        <div className="features-grid" role="list">
          {FEATURES.map(f => (
            <article key={f.id} className="feature-card" role="listitem" aria-labelledby={`feature-${f.id}-title`}>
              <div className="feature-icon" aria-hidden="true">
                {f.icon}
              </div>

              <div className="feature-body">
                <h4 id={`feature-${f.id}-title`} className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
