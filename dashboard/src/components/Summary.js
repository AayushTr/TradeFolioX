// dashboard/src/components/Summary.js
import React from 'react';

export default function Summary({ title, value, subtitle }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 16, borderRadius: 8 }}>
      <div style={{ fontSize: 14, color: '#666' }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>{subtitle}</div>
    </div>
  );
}
