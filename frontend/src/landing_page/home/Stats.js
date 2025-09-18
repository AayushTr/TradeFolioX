// Stats.js
import React from "react";
import "./Stats.css";

export default function Stats() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <div className="stats-container">
        <h2 id="stats-heading" style={{ marginBottom: "24px", fontSize: "1.8rem", color: "var(--tf-text)" }}>
          Simple Pricing
        </h2>

        <div className="stats-grid" role="list">
          <article className="tf-card" role="listitem" aria-labelledby="stat-1">
            <div className="stat-row">
              <div>
                <div id="stat-1" className="stat-value accent-teal">₹0</div>
                <div className="stat-sub">Free equity delivery and direct mutual funds</div>
              </div>
            </div>
          </article>

          <article className="tf-card" role="listitem" aria-labelledby="stat-2">
            <div className="stat-row">
              <div>
                <div id="stat-2" className="stat-value accent-amber">₹20</div>
                <div className="stat-sub">Intraday and F&O</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
