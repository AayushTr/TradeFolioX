// GeneralContext.js
import React, { createContext, useCallback, useEffect, useState } from "react";
import client from "../api/client"; // if your client is at src/api/client.js change this to '../api/client'

const GeneralContext = createContext({});

export const GeneralContextProvider = ({ children }) => {
  const [buyWindowOpen, setBuyWindowOpen] = useState(false);
  const [buyWindowSymbol, setBuyWindowSymbol] = useState(null); // always store string symbol here
  const [buyWindowMode, setBuyWindowMode] = useState("BUY"); // "BUY" or "SELL"

  const [holdings, setHoldings] = useState([]); // array of objects
  const [funds, setFunds] = useState({ available: 0, used: 0 });
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    } catch {
      return [];
    }
  });

  // Persist watchlist (always store array of strings)
  const persistWatchlist = (next) => {
    setWatchlist(next);
    try {
      localStorage.setItem("watchlist", JSON.stringify(next));
    } catch (err) {
      console.warn("persistWatchlist failed", err);
    }
  };

  // Helper to normalise whatever input into a symbol string
  const normSymbol = (s) => {
    if (!s) return null;
    if (typeof s === "string") return s;
    if (typeof s === "object") return s.symbol ?? s.name ?? String(s);
    return String(s);
  };

  const addToWatchlist = (item) => {
    const symbol = normSymbol(item);
    if (!symbol) return;
    // Normalize existing watchlist entries to strings for comparison
    const current = (watchlist || []).map((w) => normSymbol(w));
    if (current.includes(symbol)) return;
    const next = [...current, symbol];
    persistWatchlist(next);
  };

  const removeFromWatchlist = (item) => {
    const symbol = normSymbol(item);
    if (!symbol) return;
    const current = (watchlist || []).map((w) => normSymbol(w));
    const next = current.filter((s) => s !== symbol);
    persistWatchlist(next);
  };

  const isInWatch = (item) => {
    const symbol = normSymbol(item);
    if (!symbol) return false;
    const current = (watchlist || []).map((w) => normSymbol(w));
    return current.includes(symbol);
  };

  const refreshHoldings = useCallback(async () => {
    try {
      // backend route (your backend uses /api/data/holdings)
      const res = await client.get("/data/holdings");
      const newHoldings = res?.data?.holdings ?? [];
      setHoldings(newHoldings);
      return newHoldings;
    } catch (err) {
      console.warn("refreshHoldings error", err);
      return holdings;
    }
  }, [holdings]);

  const refreshFunds = useCallback(async () => {
    try {
      // backend route for funds
      const res = await client.get("/funds");
      const newFunds = res?.data?.funds ?? { available: 0, used: 0 };
      setFunds(newFunds);
      return newFunds;
    } catch (err) {
      console.warn("refreshFunds error", err);
      return funds;
    }
  }, [funds]);

  useEffect(() => {
    // initial load
    (async () => {
      await refreshHoldings();
      await refreshFunds();
      try {
        const w = JSON.parse(localStorage.getItem("watchlist") || "[]");
        setWatchlist(Array.isArray(w) ? w.map((x) => normSymbol(x)) : []);
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Orders handler: accept either axios response or plain payload { holdings, funds }
  const onOrderPlaced = async (orderResponse) => {
    try {
      const payload = orderResponse?.data ?? orderResponse ?? null;
      if (!payload) {
        await refreshHoldings();
        await refreshFunds();
        return;
      }
      const { holdings: newHoldings, funds: newFunds } = payload;
      if (Array.isArray(newHoldings)) setHoldings(newHoldings);
      if (newFunds && typeof newFunds.available !== "undefined") setFunds(newFunds);
    } catch (err) {
      console.warn("onOrderPlaced failed", err);
      await refreshHoldings();
      await refreshFunds();
    }
  };

  // openBuyWindow MUST store a symbol string and set mode
  const openBuyWindow = (item, mode = "BUY") => {
    const symbol = normSymbol(item);
    setBuyWindowSymbol(symbol);
    setBuyWindowMode(mode === "SELL" ? "SELL" : "BUY");
    setBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setBuyWindowOpen(false);
    setBuyWindowSymbol(null);
    setBuyWindowMode("BUY");
  };

  return (
    <GeneralContext.Provider
      value={{
        buyWindowOpen,
        buyWindowSymbol,
        buyWindowMode,
        openBuyWindow,
        closeBuyWindow,

        holdings,
        setHoldings,
        refreshHoldings,

        funds,
        setFunds,
        refreshFunds,

        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatch,

        onOrderPlaced,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
