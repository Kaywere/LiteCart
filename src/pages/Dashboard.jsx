import React from "react";
import "../styles/Dashboard.css";

function Dashboard() {
  const dailyEarnings = 1200; // Placeholder for daily earnings value

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card earnings">
          <h2>Daily Earnings</h2>
          <p>${dailyEarnings}</p>
        </div>
        <div className="card inventory">
          <h2>Inventory Management</h2>
          <p>Placeholder for inventory management system</p>
        </div>
        <div className="card inventory">
          <h2>Point-of-Sale</h2>
          <p>Placeholder for POS system</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
