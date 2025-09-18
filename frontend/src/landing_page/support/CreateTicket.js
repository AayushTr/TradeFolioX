// src/landing_page/support/CreateTicket.js
import React, { useState } from "react";
import "./CreateTicket.css";

export default function CreateTicket() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "general",
    message: "",
  });
  const [status, setStatus] = useState("");

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!form.email || !form.message) {
      setStatus("Email and message are required.");
      return;
    }
    try {
      // TODO: hook to your real backend
      await new Promise((r) => setTimeout(r, 700));
      setStatus("✅ Ticket submitted successfully (demo).");
      setForm({ name: "", email: "", category: "general", message: "" });
    } catch {
      setStatus("❌ Failed to submit. Try again later.");
    }
  };

  return (
    <div className="create-ticket">
      <h2>Create a Ticket</h2>
      <p>Didn’t find an answer in the help topics? Submit your query here.</p>

      {status && <div className="ticket-status">{status}</div>}

      <form className="ticket-form" onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={onChange}
          className="ticket-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Your email *"
          value={form.email}
          onChange={onChange}
          className="ticket-input"
        />
        <select
          name="category"
          value={form.category}
          onChange={onChange}
          className="ticket-select"
        >
          <option value="general">General query</option>
          <option value="account">Account opening</option>
          <option value="trading">Trading / orders</option>
          <option value="payment">Payments / withdrawals</option>
        </select>
        <textarea
          name="message"
          placeholder="Your message *"
          rows="5"
          value={form.message}
          onChange={onChange}
          className="ticket-textarea"
        />

        <button type="submit" className="ticket-btn">
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
