// frontend/src/landing_page/support/SupportPage.js
import React from "react";
import CreateTicket from "./CreateTicket";
import "./SupportPage.css";

export default function SupportPage() {
  return (
    <div className="support-page">
      {/* Hero Section */}
      <section className="support-hero">
        <div className="support-content">
          <h2>Support Portal</h2>
          <p>Search for an answer or browse help topics to create a ticket</p>
          <input
            type="text"
            placeholder="Eg. how do I activate F&O"
            className="support-search"
          />
          
        </div>
      </section>

      {/* Ticket Section */}
      <section className="ticket-section">
        <h3>Need more help?</h3>
        <p>Can’t find the answer you’re looking for? Create a support ticket below.</p>
        <CreateTicket />
      </section>
    </div>
  );
}
