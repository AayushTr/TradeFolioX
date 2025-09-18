// Modal.js
import React from "react";
import "./Modal.css";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="tf-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="tf-modal-title">
      <div className="tf-modal">
        <header className="tf-modal-header">
          <h3 id="tf-modal-title" className="tf-modal-title">{title}</h3>
          <button className="tf-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="tf-modal-body">{children}</div>
        <footer className="tf-modal-footer">
          <button className="tf-btn tf-btn-secondary" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}
