// Testimonials.js
import React from "react";
import "./Awards.css";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "TradeFoliox made investing approachable — the UI is clean and fees are transparent. I manage my portfolio in minutes.",
    name: "Rhea Kapoor",
    role: "Freelancer, Mumbai",
    stars: 5,
  },
  {
    id: 2,
    quote: "The tools and charts are surprisingly powerful for a lightweight app. Customer support helped me set up my first SIP.",
    name: "Aditya Mehra",
    role: "Software Engineer, Bangalore",
    stars: 5,
  },
  {
    id: 3,
    quote: "I switched to TradeFoliox for the predictable pricing — saves me money and the mobile app is fast.",
    name: "Nisha Verma",
    role: "Teacher, Jaipur",
    stars: 4,
  }
];

function Stars({ count }) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(
      <svg key={i} className="star" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12 .587l3.668 7.431L24 9.75l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.598 0 9.75l8.332-1.732z"/>
      </svg>
    );
  }
  return <div className="testimonial-stars" aria-hidden="true">{stars}</div>;
}

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div>
            <h3 id="testimonials-title" className="testimonials-title">What our users say</h3>
            <div className="testimonials-sub">Real feedback from early users of TradeFoliox</div>
          </div>
        </div>

        <div className="testimonials-grid" role="list">
          {TESTIMONIALS.map(t => (
            <article key={t.id} className="testimonial-card" role="listitem" aria-labelledby={`t-${t.id}-name`}>
              <p className="testimonial-quote">“{t.quote}”</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div id={`t-${t.id}-name`} className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>

                <div aria-hidden="true"><Stars count={t.stars} /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
