// BuyActionWindow.js
import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "./GeneralContext";
import client from "../api/client"; // adjust to '../api/client' if needed
import "./BuyActionWindow.css";

export default function BuyActionWindow({ uid: propUid }) {
  const g = useContext(GeneralContext);
  const close = g?.closeBuyWindow ?? (() => {});
  const refreshHoldings = g?.refreshHoldings ?? (() => {});
  const refreshFunds = g?.refreshFunds ?? (() => {});
  const onOrderPlaced = g?.onOrderPlaced ?? null;
  const contextSymbol = g?.buyWindowSymbol ?? null;
  const contextMode = g?.buyWindowMode ?? "BUY";
  const funds = g?.funds ?? { available: 0, used: 0 };

  // symbol precedence: propUid (if explicitly used) > context symbol
  const symbol = (propUid ?? contextSymbol) ?? "";

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const [side, setSide] = useState(contextMode || "BUY");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSide(contextMode || "BUY");
  }, [contextMode, contextSymbol, propUid]);

  useEffect(() => {
    setQty(1);
    setPrice("");
    setError("");
  }, [symbol]);

  const required = Number(qty || 0) * Number(price || 0);
  const canBuy = side === "SELL" || (funds?.available ?? 0) >= required;

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError("");
    if (!symbol) {
      setError("Invalid symbol");
      return;
    }
    if (!qty || Number(qty) <= 0) {
      setError("Enter valid quantity");
      return;
    }
    if (!price || Number(price) <= 0) {
      setError("Enter valid price");
      return;
    }
    if (side === "BUY" && !canBuy) {
      setError("Insufficient funds");
      return;
    }

    setLoading(true);
    try {
      const payload = { symbol, qty: Number(qty), price: Number(price), side };
      const res = await client.post("/orders", payload);

      if (onOrderPlaced) {
        await onOrderPlaced(res);
      } else {
        await refreshHoldings();
        await refreshFunds();
      }

      close();
    } catch (err) {
      console.error("order error", err);
      setError(err?.response?.data?.message || err.message || "Order failed");
      // try refresh as fallback
      try { await refreshHoldings(); await refreshFunds(); } catch {}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-modal-overlay">
      <div className="buy-modal">
        <div className="buy-modal-header">
          <strong>{side === "SELL" ? "SELL" : "BUY"}</strong>
          <span style={{ marginLeft: 10 }}>{symbol}</span>
          
        </div>

        <form onSubmit={handleSubmit} className="buy-form">
          <div className="form-row">
            <label>Qty</label>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Price</label>
            <input type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="form-row">
            <label>
              <input type="radio" checked={side === "BUY"} onChange={() => setSide("BUY")} /> Buy
            </label>
            <label style={{ marginLeft: 16 }}>
              <input type="radio" checked={side === "SELL"} onChange={() => setSide("SELL")} /> Sell
            </label>
          </div>

          <div className="form-row">
            <button type="submit" className="btn btn-blue" disabled={loading || (side === "BUY" && !canBuy)}>{loading ? "Placing..." : (side === "SELL" ? "SELL" : "BUY")}</button>
            <button type="button" className="btn btn-grey" onClick={close}>Cancel</button>
          </div>

          {error && <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>}

          <div style={{ marginTop: 12, fontSize: 13, color: "#444" }}>
            Available: ₹{funds.available ?? 0} • Used: ₹{funds.used ?? 0}
          </div>
        </form>
      </div>
    </div>
  );
}
