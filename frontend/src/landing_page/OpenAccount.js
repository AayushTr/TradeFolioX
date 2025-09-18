// OpenAccount.js
import React from "react";
import "./OpenAccount.css";

export default function OpenAccount() {
  return (
    <section className="openaccount-section" aria-labelledby="openacc-title">
      <div className="openaccount-container">
        <div className="openaccount-left">
          <h2 id="openacc-title">Open a TradeFoliox account</h2>
          <p className="openaccount-sub">
            Quick onboarding, flat pricing, and access to powerful tools — get started in minutes.
          </p>
          <a href="/signup" className="btn openaccount-cta">Sign up Now</a>
        </div>

        <div className="openaccount-right" aria-hidden="true">
          <img src="media/images/openaccount.png" alt="Open account illustration" className="openaccount-illu" />
        </div>
      </div>
    </section>
  );
}
