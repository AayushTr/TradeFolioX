// Team.js
import React from "react";
import "./Team.css";
import { Link } from "react-router-dom";


/**
 * Single-founder team section for TradeFoliox
 * - Responsive: image on left / text on right on wide screens, stacked on small screens
 * - Uses site colors (teal primary) and card-like layout
 * - Replace /assets/founder.jpg with your founder image or change src
 */

export default function Team() {
  return (
    <section className="team-section" aria-labelledby="team-heading">
      <div className="team-container">
        <h2 id="team-heading" className="team-title">People</h2>

        <div className="team-card" role="article" aria-label="Founder profile">
          <div className="founder-media">
            <img
              src="media/images/profile.jpeg"
              alt="Founder — placeholder"
              className="founder-photo"
              onError={(e) => {
                // hide broken image gracefully
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="founder-content">
            <h3 className="founder-name">Aayush Tripathi</h3>
            <div className="founder-role">Founder & CEO</div>

            <p className="founder-blurb">
              Aayush founded TradeFoliox to simplify investing for everyone. He believes
              that transparent pricing and thoughtful tools make financial markets more
              accessible. Before TradeFoliox he worked on trading platforms and product
              design — building fast, usable experiences for retail investors.
            </p>

            <p className="founder-more">
              TradeFoliox focuses on clear fees, clean UX, and modern tooling — built from
              the ground up for long-term investors and traders alike.
            </p>


            <div className="founder-links">
              <Link to="/about" className="link-inline">About</Link>
              <Link to="/contact" className="link-inline">Contact</Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
