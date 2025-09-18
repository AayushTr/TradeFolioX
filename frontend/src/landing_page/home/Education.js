// Education.js
import React, { useState } from "react";
import "./Education.css";
import Modal from "./Modal";

export default function Education() {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const openComingSoon = (name) => {
    setModalTitle(`${name} — Coming soon`);
    setModalContent(
      `We're building ${name} for TradeFoliox. It will include guides, tutorials, and community Q&A. ` +
      `If you want early access, click "Request access" below and we'll notify you when it's available.`
    );
    setOpen(true);
  };

  const requestAccess = () => {
    // placeholder action: you can extend this to call an API or add to a list
    alert("Thanks — we'll notify you when this is available.");
    setOpen(false);
  };

  return (
    <>
      <section className="education-section" aria-labelledby="education-title">
        <div className="education-container">
          <div className="education-row">
            <div className="education-left" aria-hidden="false">
              <img
                src="media/images/LearnStockx.png"
                alt="Illustration representing TradeFoliox education and learning resources"
                className="education-illustration"
              />
            </div>

            <div className="education-right">
              <h2 id="education-title" className="education-h2">Free and open market education</h2>
              <p className="education-sub">
                Learn how markets work with concise, practical content — from basic investing
                concepts to advanced strategies. Access tutorials, Q&A, and community-led
                guides built for new and experienced investors alike.
              </p>

              <div className="education-links" role="navigation" aria-label="Education links">
                <button className="education-link" onClick={() => openComingSoon("LearnStockx")}>
                  LearnStockx →
                </button>

                <button className="education-link" onClick={() => openComingSoon("TradingQ&A")}>
                  TradingQ&A →
                </button>

                <button className="education-link" onClick={() => openComingSoon("Learn more")}>
                  Learn more →
                </button>
              </div>

              <div className="education-note">
                All content is free. No ads or distractions — our learning resources are focused on helping you invest better.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal open={open} title={modalTitle} onClose={() => setOpen(false)}>
        <p>{modalContent}</p>
        <div style={{ marginTop: 18, display: "flex", gap: 8, justifyContent: "flex-end" }}>
  <button
    onClick={requestAccess}
    style={{
      padding: "8px 12px",
      background: "var(--tf-primary)",
      color: "#fff",
      borderRadius: 8,
      border: "none",
      cursor: "pointer"
    }}
  >
    Request access
  </button>
</div>

      </Modal>
    </>
  );
}
