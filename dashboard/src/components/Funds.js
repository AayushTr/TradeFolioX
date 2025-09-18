// src/components/Funds.js
import React, { useContext, useState } from "react";
import client from "../api/client";
import GeneralContext from "./GeneralContext";

export default function Funds() {
  const { funds = { available: 0, used: 0 }, setFunds, refreshFunds } =
    useContext(GeneralContext);
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");

  const doAdd = async () => {
    setMsg("");
    const amount = Number(amt);
    if (!amount || amount <= 0) {
      setMsg("Enter a valid amount");
      return;
    }
    try {
      const res = await client.post("/funds/add", { amount });
      if (res?.data?.funds) {
        setFunds(res.data.funds);
      } else {
        setFunds((prev) => ({
          ...(prev || {}),
          available: (prev?.available || 0) + amount,
        }));
      }
      setAmt("");
      setMsg("Added");
    } catch {
      setFunds((prev) => ({
        ...(prev || {}),
        available: (prev?.available || 0) + amount,
      }));
      setAmt("");
      setMsg("Added locally (backend unavailable)");
    } finally {
      try {
        await refreshFunds();
      } catch {}
    }
  };

  const doWithdraw = async () => {
    setMsg("");
    const amount = Number(amt);
    if (!amount || amount <= 0) {
      setMsg("Enter a valid amount");
      return;
    }
    if (amount > (funds.available || 0)) {
      setMsg("Not enough available funds");
      return;
    }
    try {
      const res = await client.post("/funds/withdraw", { amount });
      if (res?.data?.funds) {
        setFunds(res.data.funds);
      } else {
        setFunds((prev) => ({
          ...(prev || {}),
          available: (prev?.available || 0) - amount,
        }));
      }
      setAmt("");
      setMsg("Withdrawn");
    } catch {
      setFunds((prev) => ({
        ...(prev || {}),
        available: (prev?.available || 0) - amount,
      }));
      setAmt("");
      setMsg("Withdrawn locally (backend unavailable)");
    } finally {
      try {
        await refreshFunds();
      } catch {}
    }
  };

  return (
    <div style={{ padding: "24px 32px" }}>
      <h2>Funds</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Available:</strong> ₹{funds.available ?? 0} &nbsp; • &nbsp;
        <strong>Used:</strong> ₹{funds.used ?? 0}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          placeholder="Amount"
          style={{
            padding: "10px 14px",
            border: "1px solid #e6e6e6",
            borderRadius: 6,
            flex: "0 0 160px",
          }}
        />
        <button onClick={doAdd} className="btn btn-blue">
          Add
        </button>
        <button onClick={doWithdraw} className="btn btn-grey">
          Withdraw
        </button>
      </div>

      {msg && <div style={{ marginTop: 16 }}>{msg}</div>}
    </div>
  );
}
