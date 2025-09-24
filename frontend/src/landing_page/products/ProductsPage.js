// ProductsPage.js
import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import { Link } from "react-router-dom";


export default function ProductsPage() {
  return (
    <main
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#111827",
      }}
    >
      {/* Hero */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 8%",
          gap: 40,
          background: "#fff",
        }}
      >
        <LeftSection />
        <RightSection />
      </section>

      {/* Features */}
      <section style={{ background: "#F9FAFB", padding: "56px 8%" }}>
        <h2
          style={{ fontSize: 28, margin: 0, color: "#111827", fontWeight: 700 }}
        >
          Why TradeFolio Dashboard?
        </h2>
        <p style={{ marginTop: 8, marginBottom: 28, color: "#6B7280" }}>
          Focused, fast, and built for clarity — everything you need to track,
          analyse and act on your portfolio.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20,
          }}
        >
          {[
            {
              title: "Real-time charts & alerts",
              desc: "Interactive charts, custom indicators, and price alerts so you never miss a move.",
              icon: "📈",
            },
            {
              title: "Portfolio insights",
              desc: "Holdings view, P&L, allocation breakdowns and trend analysis at a glance.",
              icon: "🧾",
            },
            {
              title: "Watchlists & orders",
              desc: "Create watchlists, place simulated orders or track real trades — simple and fast.",
              icon: "🔖",
            },
            {
              title: "Reports & export",
              desc: "Export performance reports and transaction history for taxes or personal records.",
              icon: "📤",
            },
          ].map((f, i) => (
            <article
              key={i}
              style={{
                background: "#fff",
                padding: 22,
                borderRadius: 12,
                boxShadow: "0 8px 30px rgba(2,6,23,0.06)",
                minHeight: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <h3
                style={{
                  margin: "12px 0 8px",
                  fontSize: 18,
                  color: "#111827",
                }}
              >
                {f.title}
              </h3>
              <p style={{ margin: 0, color: "#6B7280", lineHeight: 1.45 }}>
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Universe */}
      <Universe />

      {/* CTA strip */}
      <section
        style={{
          padding: "40px 8%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 20, color: "#111827" }}>
            Ready to simplify your trading workflow?
          </h3>
          <p style={{ margin: "8px 0 0", color: "#6B7280" }}>
            Start a free account and get your dashboard set up in minutes.
          </p>
        </div>

<Link
  to="/signup"
  style={{
    backgroundColor: "#0D9488",
    color: "#fff",
    padding: "12px 26px",
    borderRadius: 10,
    fontWeight: 700,
    boxShadow: "0 8px 20px rgba(13,148,136,0.2)",
    textDecoration: "none",
  }}
>
  Open an account
</Link>

      </section>
    </main>
  );
}
