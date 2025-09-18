// NotFound.js
import React from "react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="notfound-page" role="main" aria-labelledby="404-title">
      <div className="notfound-container">
        <h1 id="404-title" className="nf-code">404</h1>
        <h2 className="nf-title">Page not found</h2>
        <p className="nf-sub">We couldn't find the page you're looking for. It may have moved or no longer exists.</p>

        <div className="nf-actions">
          <a className="btn btn-primary" href="/">Go home</a>
          <a className="btn btn-secondary" href="/contact">Contact support</a>
        </div>
      </div>
    </main>
  );
}
