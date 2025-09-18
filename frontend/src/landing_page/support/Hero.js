import React from "react";
import "./Hero.css";

export default function Hero({ onTrackClick }) {
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = e.target.elements.supportSearch.value.trim();
    if (q) alert(`Search for: ${q}`);
  };

  return (
    <section id="supportHero">
      <div className="support-container">
        {/* header */}
        <div className="support-header">
          <h4>Support Portal</h4>
          <button className="track-btn" onClick={onTrackClick}>
            Track Tickets
          </button>
        </div>

        {/* grid */}
        <div className="support-grid">
          <div>
            <h1 className="support-title">
              Search for an answer or browse help topics to create a ticket
            </h1>
            <form className="support-search" onSubmit={onSearchSubmit}>
              <input
                name="supportSearch"
                type="search"
                aria-label="Search help"
                placeholder="Eg. how do I activate F&O"
              />
            </form>
            <div className="support-links">
              <a href="#track-account">Track account opening</a>
              <a href="#segment">Track segment activation</a>
              <a href="#margins">Intraday margins</a>
              <a href="#manual">Kite user manual</a>
            </div>
          </div>

          <aside className="featured-box">
            <h2>Featured</h2>
            <ol>
              <li>
                <a href="#takeovers">Current Takeovers and Delisting - Jan 2024</a>
              </li>
              <li>
                <a href="#intraday-leverages">Latest Intraday leverages - MIS & CO</a>
              </li>
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
