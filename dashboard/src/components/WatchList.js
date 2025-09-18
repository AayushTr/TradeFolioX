// dashboard/src/components/WatchList.js
import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import DoughnutChart from "./DoughnoutChart";
import { allShares } from "../data/data";

export default function WatchList() {
  const {
    watchlist = [],
    removeFromWatchlist,
    addToWatchlist,
    openBuyWindow,
    isInWatch,
  } = useContext(GeneralContext);

  const normalize = (item) => {
    if (!item) return null;
    if (typeof item === "string") return item;
    if (typeof item === "object") return item.symbol ?? item.name ?? String(item);
    return String(item);
  };

  const enrichedWatchlist = (watchlist || []).map((sym) => {
    const share = allShares.find((s) => s.name === sym || s.symbol === sym);
    if (share) return share;
    return { symbol: sym, name: sym, price: "-", percent: "—", isDown: false };
  });

  const ArrowUp = ({ size = 10 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 4l-8 8h6v8h4v-8h6z" />
    </svg>
  );
  const ArrowDown = ({ size = 10 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 20l8-8h-6V4h-4v8H4z" />
    </svg>
  );

  return (
    <div
      className="watchlist-container"
      style={{
        width: 320,
        padding: 10,
        boxSizing: "border-box",
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        height: "100vh",
      }}
    >
      {/* Search & count */}
      <div>
        <input
          placeholder="Search eg: infy, bse, nifty..."
          style={{
            width: "100%",
            padding: "6px 12px", // increased left/right padding
            borderRadius: 6,
            border: "1px solid #eee",
            fontSize: 12,
            boxSizing: "border-box",
          }}
        />
        <div style={{ marginTop: 6, color: "#666", fontSize: 11 }}>
          {(watchlist || []).length} / 50
        </div>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          overflowY: "auto",
          flex: "1 1 auto",
        }}
      >
        {enrichedWatchlist.map((share, idx) => {
          const symbol = normalize(share) || share.symbol || `s-${idx}`;
          const price = share.price ?? "-";
          const name = share.name ?? share.symbol ?? "";
          const percent = share.percent ?? "—";
          const isDown = share.isDown ?? false;
          const changeColor = isDown ? "#c83737" : "#099a64";

          return (
            <li
              key={symbol}
              style={{
                padding: "6px 0",
                borderBottom: "1px solid #f3f3f3",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                fontSize: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 70 }}>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{symbol}</div>
                <div style={{ fontSize: 10, color: "#888" }}>{name}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 80 }}>
                <div style={{ fontWeight: 600, fontSize: 12 }}>
                  {price !== "-" ? `₹${Number(price).toLocaleString()}` : "-"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 700, fontSize: 11, color: changeColor }}>
                  {isDown ? <ArrowDown size={10} /> : <ArrowUp size={10} />}
                  <span>{percent}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, minWidth: 90, justifyContent: "flex-end" }}>
                <button
                  className="btn btn-blue"
                  style={{ minWidth: 30, padding: "4px 6px", fontSize: 11 }}
                  onClick={() => openBuyWindow(symbol, "BUY")}
                >
                  B
                </button>
                <button
                  className="btn btn-blue"
                  style={{ minWidth: 30, padding: "4px 6px", fontSize: 11 }}
                  onClick={() => openBuyWindow(symbol, "SELL")}
                >
                  S
                </button>
                <button
                  className="btn"
                  onClick={() => removeFromWatchlist(symbol)}
                  title="Remove"
                  style={{
                    border: "1px solid #eee",
                    background: "#fff",
                    color: "#444",
                    padding: "4px 6px",
                    fontSize: 12,
                    borderRadius: 6,
                  }}
                >
                  🗑
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 8 }}>
        <DoughnutChart holdings={enrichedWatchlist} watchlistOnly />
      </div>
    </div>
  );
}
