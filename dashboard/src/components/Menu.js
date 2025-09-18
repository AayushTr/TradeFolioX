import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const activeFor = (path) => {
    if (path === "/dashboard" && (location.pathname === "/dashboard" || location.pathname === "/dashboard/")) {
      return "menu selected";
    }
    return location.pathname.startsWith(path) ? "menu selected" : "menu";
  };

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <p className={activeFor("/dashboard")}>Dashboard</p>
            </Link>
          </li>

          {/* All Shares right below Dashboard */}
          <li>
            <Link to="/dashboard/allshares" style={{ textDecoration: "none" }}>
              <p className={activeFor("/dashboard/allshares")}>All Shares</p>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/orders" style={{ textDecoration: "none" }}>
              <p className={activeFor("/dashboard/orders")}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/holdings" style={{ textDecoration: "none" }}>
              <p className={activeFor("/dashboard/holdings")}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/positions" style={{ textDecoration: "none" }}>
              <p className={activeFor("/dashboard/positions")}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/funds" style={{ textDecoration: "none" }}>
              <p className={activeFor("/dashboard/funds")}>Funds</p>
            </Link>
          </li>
        </ul>

        <hr />

        <div className="profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
