// dashboard/src/components/Positions.js
import React, { useState, useEffect } from "react";
import client from "../api/client";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPositions = async () => {
    try {
      const res = await client.get("/data/positions");
      setPositions(res.data.positions || []);
    } catch {
      setPositions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  if (loading) return <p style={{ padding: "24px 32px" }}>Loading positions...</p>;
  if (!positions || positions.length === 0)
    return <p style={{ padding: "24px 32px" }}>No open positions</p>;

  return (
    <div className="positions-container" style={{ padding: "24px 32px" }}>
      <h2>Positions</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 12,
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Symbol</th>
            <th>Quantity</th>
            <th>Avg. Price</th>
            <th>Current Price</th>
            <th>P&L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p, idx) => {
            const pnl = (p.currentPrice - p.avgPrice) * p.quantity;
            return (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td>{p.symbol}</td>
                <td>{p.quantity}</td>
                <td>₹{p.avgPrice?.toFixed(2)}</td>
                <td>₹{p.currentPrice?.toFixed(2)}</td>
                <td style={{ color: pnl >= 0 ? "green" : "red" }}>
                  {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Positions;
