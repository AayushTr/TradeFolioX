// frontend/src/components/Footer.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Modal from "./home/Modal"; // keep modal import if you use modal for coming-soon links

/**
 * Footer for TradeFoliox
 * - Uses react-router Link for internal navigation (SPA friendly)
 * - Unavailable links open a "coming soon" modal
 * - Logo path uses PUBLIC_URL so public/media/... works
 */

const FOOTER_LINKS = {
  product: [
    { title: "Features", href: "/features", available: true },
    { title: "Pricing", href: "/pricing", available: true },
    { title: "Products", href: "/product", available: true } // ensure points to existing product page
  ],
  learn: [
    { title: "LearnStockx", href: "/learn", available: false },
    { title: "Blog", href: "/blog", available: false },
    { title: "Help Center", href: "/support", available: true }
  ],
  company: [
    { title: "About", href: "/about", available: true },
    { title: "Careers", href: "/careers", available: false },
    { title: "Contact", href: "/contact", available: true }
  ]
};

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [pendingHref, setPendingHref] = useState(null);

  const handleUnavailable = (link) => (e) => {
    e.preventDefault();
    setPendingHref(link.href || null);
    setModalTitle(`${link.title} — Coming soon`);
    setModalBody(
      `${link.title} is coming to TradeFoliox soon. If you'd like to be notified when it’s ready, click "Request access".`
    );
    setModalOpen(true);
  };

  const requestAccess = () => {
    // TODO: call backend to record interest if needed
    setModalOpen(false);
    setPendingHref(null);
    // a small UX confirmation
    window.alert("Thanks — we'll notify you when this is available.");
  };

  // helper: render a link (Link for internal available, anchor for external)
  const RenderLink = ({ l }) => {
    if (!l.available) {
      // show as clickable but open modal
      return (
        <a href={l.href || "#"} onClick={handleUnavailable(l)} className="footer-link coming">
          {l.title}
        </a>
      );
    }

    // available - internal routes: use react-router Link to avoid full reload
    return (
      <Link to={l.href} className="footer-link">
        {l.title}
      </Link>
    );
  };

  return (
    <>
      <footer className="footer" role="contentinfo" aria-label="TradeFoliox footer">
        <div className="footer-container">
          {/* Brand + short description */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img
                src={`${process.env.PUBLIC_URL}/media/images/logo.png`}
                alt="TradeFoliox logo"
                className="footer-logo"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            <div className="footer-desc">
              Simple, transparent investing across stocks, mutual funds, ETFs and more.
              Built for clarity — predictable pricing, fast onboarding, and modern tools.
            </div>
          </div>

          {/* Links columns */}
          <div className="footer-links" role="navigation" aria-label="Footer navigation">
            <div className="link-column">
              <h4>Product</h4>
              {FOOTER_LINKS.product.map((l) => (
                <RenderLink key={l.href} l={l} />
              ))}
            </div>

            <div className="link-column">
              <h4>Learn</h4>
              {FOOTER_LINKS.learn.map((l) => (
                <RenderLink key={l.href} l={l} />
              ))}
            </div>

            <div className="link-column">
              <h4>Company</h4>
              {FOOTER_LINKS.company.map((l) => (
                <RenderLink key={l.href} l={l} />
              ))}
            </div>
          </div>
        </div>

        {/* bottom row — descriptive text */}
        <div className="footer-container footer-bottom">
          <div className="footer-copy-col">
            <div className="copyright">© {new Date().getFullYear()} TradeFoliox. All rights reserved.</div>
            <div className="footer-muted">
              TradeFoliox is an independent investing platform. Not financial advice. Please read our terms and privacy policy.
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for unavailable links */}
      <Modal open={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)}>
        <p style={{ marginTop: 0 }}>{modalBody}</p>
        <div style={{ marginTop: 18, display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={requestAccess}
            style={{
              padding: "8px 12px",
              background: "var(--tf-primary)",
              color: "#fff",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Request access
          </button>
        </div>
      </Modal>
    </>
  );
}
