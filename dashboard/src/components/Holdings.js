// src/components/Holdings.js
import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import DoughnutChart from "./DoughnoutChart";

/**
 * Helper: parse a value that might be:
 *  - number (returned as-is)
 *  - numeric string e.g. "510", "1,234.50"
 *  - currency string e.g. "₹1,234", "Rs. 1,234.00"
 * Returns 0 for invalid values.
 */
function parseNumber(val) {
  if (val === null || typeof val === "undefined") return 0;
  if (typeof val === "number") {
    return Number.isFinite(val) ? val : 0;
  }
  // string: strip non-digit except dot and minus sign
  if (typeof val === "string") {
    // remove currency symbols, spaces, commas, and other text
    const cleaned = val.replace(/[^\d.-]+/g, "").trim();
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  // fallback
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

export default function Holdings() {
  const { holdings = [] } = useContext(GeneralContext);

  if (!Array.isArray(holdings) || holdings.length === 0) {
    return <div style={{ padding: 24 }}>No holdings found</div>;
  }

  // normalize holdings into numeric values we can rely on
  const chartHoldings = holdings.map((h) => {
    const qty = parseNumber(h?.quantity ?? h?.qty ?? 0);
    const avg = parseNumber(h?.avgPrice ?? h?.avg_price ?? h?.avg_cost ?? h?.price ?? 0);
    const currRaw = (typeof h?.currentPrice !== "undefined" && h?.currentPrice !== null)
      ? h.currentPrice
      : (typeof h?.ltp !== "undefined" && h.ltp !== null ? h.ltp : null);
    const curr = parseNumber(currRaw) || avg; // prefer current price if present, else avg
    return {
      symbol: (h?.symbol ?? h?.name ?? String(h)).toString(),
      quantity: qty,
      avgPrice: avg,
      currentPrice: curr,
    };
  });

  // (optional) compute totals if you need to show later
  const totalInvestment = chartHoldings.reduce((s, it) => s + it.quantity * it.avgPrice, 0);
  const totalValue = chartHoldings.reduce((s, it) => s + it.quantity * it.currentPrice, 0);

  return (
    <div style={{ padding: "24px 32px" }}>
      <h2>Holdings</h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginTop: 16,
        }}
      >
        {/* Table */}
        <div style={{ flex: 1, minWidth: 320 }} className="card">
          <table className="holdings-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Symbol</th>
                <th style={{ textAlign: "right", width: 100 }}>Quantity</th>
                <th style={{ textAlign: "right", width: 140 }}>Avg. Price</th>
                <th style={{ textAlign: "right", width: 140 }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {chartHoldings.map((h, idx) => {
                const value = h.quantity * h.currentPrice;
                return (
                  <tr key={`${h.symbol}-${idx}`}>
                    <td style={{ fontWeight: 700 }}>{h.symbol}</td>
                    <td style={{ textAlign: "right" }}>{h.quantity.toLocaleString("en-IN")}</td>
                    <td style={{ textAlign: "right" }}>₹{h.avgPrice.toLocaleString("en-IN")}</td>
                    <td style={{ textAlign: "right" }}>₹{value.toLocaleString("en-IN")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals row (optional) */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, color: "#666", fontSize: 13 }}>
            <div style={{ textAlign: "right" }}>
              <div>Investment: ₹{totalInvestment.toLocaleString("en-IN")}</div>
              <div>Current Value: ₹{totalValue.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: 420 }} className="card chart-card">
          <h4>Distribution</h4>
          <div style={{ height: 300 }}>
            <DoughnutChart holdings={chartHoldings} />
          </div>
        </div>
      </div>
    </div>
  );
}
