// src/components/VerticalGraph.js
import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import GeneralContext from "./GeneralContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TF_COLORS = ["#0D9488", "#34D399", "#A78BFA", "#F59E0B", "#F97316"];

export default function VerticalGraph({ holdings: propHoldings }) {
  const ctx = useContext(GeneralContext);
  const holdings = Array.isArray(propHoldings) && propHoldings.length
    ? propHoldings
    : Array.isArray(ctx.holdings) && ctx.holdings.length
    ? ctx.holdings
    : [];

  if (!holdings || holdings.length === 0) {
    return <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", color: "#777" }}>No holdings</div>;
  }

  const labels = holdings.map((h) => (typeof h === "string" ? h : h.symbol ?? h.name ?? "Unknown"));
  const dataVals = holdings.map((h) => Number(h.quantity ?? h.qty ?? 0));

  const data = {
    labels,
    datasets: [
      {
        label: "Quantity",
        data: dataVals,
        backgroundColor: labels.map((_, i) => TF_COLORS[i % TF_COLORS.length]),
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { autoSkip: false, maxRotation: 45 },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.06)" },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: 340 }}>
      <Bar options={options} data={data} />
    </div>
  );
}
