// dashboard/src/components/Orders.js
import React, { useState, useEffect } from "react";
import client from "../api/client";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await client.get("/data/orders");
      setOrders(res.data.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p style={{ padding: "24px 32px" }}>Loading orders...</p>;
  if (!orders || orders.length === 0)
    return <p style={{ padding: "24px 32px" }}>No orders yet</p>;

  return (
    <div className="orders-container" style={{ padding: "24px 32px" }}>
      <h2>Orders</h2>
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
            <th>Side</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td>{o.symbol}</td>
              <td>{o.side}</td>
              <td>{o.quantity}</td>
              <td>₹{o.price?.toFixed(2)}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
