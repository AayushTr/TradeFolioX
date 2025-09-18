// ContactPage.js
import React from "react";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <main className="page contact-page" aria-labelledby="contact-title">
      <div className="page-container">
        <h1 id="contact-title" className="page-title">Contact Us</h1>
        <p className="page-sub">
          Have questions about TradeFoliox? Reach out and our team will get back to you quickly.
        </p>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Write your message..." rows={5} required />
          </div>

          <button type="submit" className="btn-primary">Send message</button>
        </form>
      </div>
    </main>
  );
}
