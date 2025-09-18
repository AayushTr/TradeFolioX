// src/components/Home.js
import React, { useEffect, useState, useContext } from 'react';
import client from '../api/client';
import Holdings from './Holdings';
import VerticalGraph from './VerticalGraph';
import GeneralContext from './GeneralContext';

export default function Home() {
  const { holdings: ctxHoldings } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchHoldings = async () => {
      try {
        const res = await client.get('/data/holdings');
        if (mounted) setHoldings(res.data.holdings || []);
      } catch {
        if (mounted) setHoldings([]);
      }
    };
    fetchHoldings();
    return () => { mounted = false; };
  }, []);

  const effectiveHoldings = (ctxHoldings && ctxHoldings.length) ? ctxHoldings : holdings;

  const investment = effectiveHoldings.reduce(
    (s, h) => s + ((h.avgPrice || 0) * (h.quantity || 0)),
    0
  );
  const currentValue = effectiveHoldings.reduce(
    (s, h) => s + ((h.currentPrice || h.avgPrice || 0) * (h.quantity || 0)),
    0
  );
  const pnl = currentValue - investment;

  return (
    <div style={{ padding: "16px 20px", margin: 0, flex: 1, width: "100%", boxSizing: "border-box" }}>

      {/* Summary cards */}
      <div
        className="summary-grid"
        style={{
          marginTop: 6,
          display: 'flex',
          gap: 16,
          alignItems: 'stretch',
          flexWrap: 'wrap'
        }}
      >
        <div className="card" style={{ flex: '1 1 420px', minWidth: 220 }}>
          <h4>Equity</h4>
          <div className="big">₹{(Math.round((currentValue - pnl) || 0)).toLocaleString()}</div>
          <div style={{ marginTop: 8, color: '#666' }}>
            Opening balance ₹{((currentValue - pnl) || 0).toFixed(2)}
          </div>
        </div>

        <div className="card" style={{ flex: '1 1 220px', minWidth: 200 }}>
          <h4>Holdings</h4>
          <div className="big">₹{Math.round(currentValue).toLocaleString()}</div>
          <div style={{ marginTop: 8, color: '#666' }}>
            Investment ₹{Math.round(investment).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          marginTop: 20,
          flexWrap: 'wrap',         // allow wrap to avoid horizontal scroll
          alignItems: 'flex-start',
        }}
      >
        {/* Bar chart (left) */}
        <div
          style={{
            flex: 1,
            minWidth: 0,           // allow proper shrinking
            boxSizing: 'border-box',
          }}
          className="card"
        >
          <h4>Holdings</h4>
          <VerticalGraph holdings={effectiveHoldings} />
        </div>

        {/* Table + doughnut (right) — fluid: width 100% up to maxWidth 420 */}
        <div
          style={{
            width: '100%',
            maxWidth: 420,       // will not exceed 420px
            flex: '0 0 auto',    // keep it as its own column when space allows
            boxSizing: 'border-box',
          }}
          className="card"
        >
          <h4>Performance</h4>
          <Holdings />
        </div>
      </div>
    </div>
  );
}
