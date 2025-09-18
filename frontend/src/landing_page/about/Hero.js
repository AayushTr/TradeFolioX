// Hero.js
import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <div className="about-hero__inner">

        <div className="about-hero__left">
          <h1 id="about-hero-title" className="about-hero__title">
            Built for clarity &amp; confident investing
            <span className="accent"> TradeFoliox</span>
          </h1>

          <p className="about-hero__lead">
            At TradeFoliox we believe investing should be predictable, affordable and easy to use.
            We build fast, secure tools and keep fees transparent so you can focus on what matters —
            growing your portfolio.
          </p>

          <div className="about-hero__bullets">
            <div className="bullet">
              <strong>Transparent pricing</strong>
              <span>Flat, predictable fees — no surprises.</span>
            </div>
            <div className="bullet">
              <strong>Simple onboarding</strong>
              <span>Open an account quickly and start investing in minutes.</span>
            </div>
            <div className="bullet">
              <strong>Modern tools</strong>
              <span>Clear portfolio views, fast order flows and practical insights.</span>
            </div>
          </div>

          <div className="about-hero__ctas">
            <Link to="/signup" className="btn-primary">Open an account</Link>
            <Link to="/features" className="btn-secondary">Explore features</Link>
          </div>
        </div>

        <div className="about-hero__right" role="img" aria-label="Illustration showing dashboard and charts">
          <img
            src="media/images/about.png"
            alt="Dashboard and portfolio illustration"
            className="about-illustration"
            onError={(e) => {
              // fallback: hide broken image gracefully
              e.target.style.display = "none";
            }}
          />
        </div>

      </div>
    </section>
  );
}
