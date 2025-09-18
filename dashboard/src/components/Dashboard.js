import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './TopBar';
import WatchList from './WatchList';
import Home from './Home';
import Orders from './Orders';
import Holdings from './Holdings';
import Positions from './Positions';
import Funds from './Funds';
import AllShares from './AllShares';
import BuyActionWindow from './BuyActionWindow';
import GeneralContext from './GeneralContext';

export default function Dashboard() {
  const { buyWindowOpen } = useContext(GeneralContext);

  return (
    <div className="dashboard-root" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left: persistent watchlist */}
      <aside style={{ width: 300 }}>
        <WatchList />
      </aside>

      {/* Right: topbar + routed content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar />

        <main style={{ flex: 1, overflow: 'auto', background: 'transparent' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="allshares" element={<AllShares />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* render buy window overlay when requested */}
      {buyWindowOpen && <BuyActionWindow />}
    </div>
  );
}
