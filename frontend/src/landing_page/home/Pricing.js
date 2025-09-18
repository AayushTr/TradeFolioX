// Pricing.js
import React from "react";
import "./Pricing.css";

export default function Pricing() {
  return (
    <section className="pricing-section" aria-labelledby="pricing-title">
      <div className="pricing-container">
        <div className="pricing-row">
          {/* Left: text */}
          <div className="pricing-left">
            <h2 id="pricing-title" className="pricing-h2">Why our pricing is unbeatable</h2>
            <p className="pricing-desc">
              We pioneered discount broking and price transparency — flat fees and no hidden charges.
              Our goal is to make investing affordable and predictable. TradeFoliox keeps product costs low
              and passes the savings to you.
            </p>

            <a className="pricing-link" href="/pricing" aria-label="See pricing details">
              See Pricing →
            </a>
          </div>

          {/* Right: illustration */}
          <div className="pricing-right" aria-hidden="false">
            <img
              src="media/images/simplepricing.png"
              alt="Illustration of simple pricing"
              className="pricing-illustration"
            />
          </div>
        </div>

        <div className="pricing-divider" />
      </div>
    </section>
  );
}
