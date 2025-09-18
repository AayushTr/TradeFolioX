// dashboard/src/components/AllShares.js
import React, { useContext, useMemo, useState } from "react";
import GeneralContext from "./GeneralContext";
import { allShares } from "../data/data";
import "./AllShares.css";   // keep import in case you want extra styles

export default function AllShares() {
  const {
    watchlist = [],
    addToWatchlist,
    removeFromWatchlist,
    openBuyWindow,
    isInWatch,
  } = useContext(GeneralContext);

  const [query, setQuery] = useState("");

  const normalize = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    if (typeof item === "object") return item.symbol ?? item.name ?? "";
    return String(item);
  };

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return allShares;
    return allShares.filter(
      (s) =>
        (s.symbol && s.symbol.toLowerCase().includes(q)) ||
        (s.name && s.name.toLowerCase().includes(q))
    );
  }, [query]);

  // arrow icons
  const ArrowUp = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 4l-8 8h6v8h4v-8h6z" />
    </svg>
  );
  const ArrowDown = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M12 20l8-8h-6V4h-4v8H4z" />
    </svg>
  );

  // Inline styles
  const containerStyle = {
    paddingLeft: 28,
    paddingRight: 24,
    paddingTop: 8,
    boxSizing: "border-box",
    width: "100%",
  };

  const searchStyle = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #e9e9e9",
    boxSizing: "border-box",
    marginBottom: 14,
    fontSize: 14,
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    marginBottom: 10,
    border: "1px solid #f3f3f3",
    borderRadius: 8,
    background: "#fff",
    boxSizing: "border-box",
  };

  const shareLeftStyle = {
    minWidth: 200,
    maxWidth: "36%",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flexShrink: 0,
  };

  const shareNameStyle = {
    fontWeight: 700,
    color: "#222",
    fontSize: 14,
  };

  const shareSubStyle = { fontSize: 11, color: "#9aa0a6" };

  const shareMiddleStyle = {
    flex: "1 1 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  };

  const priceAndChangeStyle = { display: "flex", alignItems: "center", gap: 12 };

  const sharePriceStyle = { fontSize: 14, color: "#444", fontWeight: 600 };

  const shareChangeStyle = (isDown) => ({
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 700,
    fontSize: 12,
    color: isDown ? "#dc2626" : "#16a34a",
  });

  const shareRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 240,
    justifyContent: "flex-end",
  };

  // Button base
  const btnStyle = {
    minWidth: 52,
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
  };

  // Themed buttons
  const btnBuy = { ...btnStyle, background: "#0D9488", color: "#fff" };   // teal
  const btnSell = { ...btnStyle, background: "#F59E0B", color: "#fff" };  // amber
  const btnAdd = { ...btnStyle, background: "#f3f4f6", color: "#374151" }; // gray

  const smallTrashStyle = {
    border: "none",
    background: "transparent",
    color: "#444",
    cursor: "pointer",
    fontSize: 16,
    minWidth: 28,
  };

  return (
    <div style={containerStyle} className="allshares-inline">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Search input */}
        <input
          style={searchStyle}
          placeholder="Search eg: infy, reliance..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Expanded list */}
        <div>
          {filtered.map((s, idx) => {
            const symbol = normalize(s) || `item-${idx}`;
            const inWL = isInWatch ? isInWatch(symbol) : false;

            const percent = s.percent ?? s.changePercent ?? s.change ?? "—";
            const priceVal = s.price ?? s.lastPrice ?? s.ltp ?? "—";
            const isDown =
              typeof s.isDown === "boolean"
                ? s.isDown
                : s.changeDirection === "down" ||
                  (typeof s.change === "string" && s.change.startsWith("-"));

            return (
              <div key={`${symbol}-${idx}`} style={rowStyle}>
                {/* Left: name */}
                <div style={shareLeftStyle}>
                  <div style={shareNameStyle}>{symbol}</div>
                  <div style={shareSubStyle}>{s.name ?? ""}</div>
                </div>

                {/* Middle: price + percent */}
                <div style={shareMiddleStyle}>
                  <div style={priceAndChangeStyle}>
                    <div style={sharePriceStyle}>
                      {priceVal !== undefined && priceVal !== "—"
                        ? `₹${Number(priceVal).toLocaleString()}`
                        : "—"}
                    </div>

                    <div style={shareChangeStyle(isDown)}>
                      {isDown ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
                      <span style={{ marginLeft: 4 }}>{percent}</span>
                    </div>
                  </div>
                </div>

                {/* Right: actions */}
                <div style={shareRightStyle}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={btnBuy}
                      onClick={() =>
                        openBuyWindow && openBuyWindow(symbol, "BUY")
                      }
                    >
                      Buy
                    </button>

                    <button
                      style={btnSell}
                      onClick={() =>
                        openBuyWindow && openBuyWindow(symbol, "SELL")
                      }
                    >
                      Sell
                    </button>

                    {!inWL ? (
                      <button
                        style={btnAdd}
                        onClick={() =>
                          addToWatchlist && addToWatchlist(symbol)
                        }
                      >
                        + Add
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            padding: "6px 10px",
                            borderRadius: 8,
                            background: "#efefef",
                            color: "#444",
                            fontWeight: 600,
                          }}
                        >
                          Added
                        </div>

                        <button
                          style={smallTrashStyle}
                          onClick={() =>
                            removeFromWatchlist && removeFromWatchlist(symbol)
                          }
                          title="Remove"
                          aria-label={`Remove ${symbol}`}
                        >
                          🗑
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
