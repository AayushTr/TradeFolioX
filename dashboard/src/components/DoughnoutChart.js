// src/components/DoughnoutChart.js
import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import GeneralContext from "./GeneralContext";

ChartJS.register(ArcElement, Tooltip, Legend);

/* small deterministic palette */
const TF_PALETTE = ["#0D9488", "#F59E0B", "#34D399", "#A78BFA", "#F472B6", "#60A5FA", "#F97316"];

function parseNumber(val) {
  if (val === null || typeof val === "undefined") return 0;
  if (typeof val === "number") return Number.isFinite(val) ? val : 0;
  if (typeof val === "string") {
    const cleaned = val.replace(/[^\d.-]+/g, "").trim();
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

export default function DoughnutChart({ holdings: propHoldings, watchlistOnly = false }) {
  const ctx = useContext(GeneralContext);

  let source =
    Array.isArray(propHoldings) && propHoldings.length
      ? propHoldings
      : watchlistOnly && Array.isArray(ctx?.watchlist) && ctx.watchlist.length
      ? ctx.watchlist
      : Array.isArray(ctx?.holdings)
      ? ctx.holdings
      : [];

  if (!Array.isArray(source) || source.length === 0) {
    return (
      <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", color: "#777" }}>
        No data
      </div>
    );
  }

  const labels = [];
  const values = [];

  source.forEach((item) => {
    // label
    const label = typeof item === "string" ? item : (item.symbol ?? item.name ?? item.title ?? "Unknown");
    labels.push(label);

    // value: try watchlist-like price first, otherwise compute qty * unit price
    let val = 0;

    if (watchlistOnly || typeof item.price !== "undefined") {
      val = parseNumber(item.price ?? item.currentPrice ?? item.ltp ?? 0);
    } else if (typeof item.quantity !== "undefined" || typeof item.qty !== "undefined") {
      const qty = parseNumber(item.quantity ?? item.qty ?? 0);
      const unit = parseNumber(item.currentPrice ?? item.ltp ?? item.avgPrice ?? item.price ?? 0);
      val = qty * unit;
    } else {
      // fallback: try currentPrice/avgPrice
      val = parseNumber(item.currentPrice ?? item.avgPrice ?? item.price ?? 0);
    }

    // don't force to 1 — keep 0 if truly 0. Chart will ignore zero slices.
    values.push(val > 0 ? Number(val) : 0);
  });

  // if all values are zero, show nothing / 'No data'
  const total = values.reduce((s, v) => s + v, 0);
  if (total === 0) {
    return (
      <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", color: "#777" }}>
        No numeric data to display
      </div>
    );
  }

  const colors = labels.map((_, i) => TF_PALETTE[i % TF_PALETTE.length]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverOffset: 8,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 12, padding: 8 } },
      tooltip: {
        callbacks: {
          label: function (ctx) {
            const lab = ctx.label ?? "";
            const raw = ctx.raw ?? 0;
            const formatted = typeof raw === "number" ? raw.toLocaleString("en-IN") : raw;
            return `${lab}: ₹${formatted}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: 320 }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
