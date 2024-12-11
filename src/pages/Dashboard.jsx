import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [dailyEarnings, setDailyEarnings] = useState(null); // Initialize as null to detect loading
  const [totalInvoices, setTotalInvoices] = useState(null); // Initialize as null
  const [totalItems, setTotalItems] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchDailyEarnings = async () => {
      try {
        const response = await fetch("https://decryptic.online/php2/getTodaySales.php");
        const data = await response.json();
        setDailyEarnings(parseFloat(data.total_sales || 0));
      } catch (error) {
        console.error("Error fetching daily earnings:", error);
      }
    };

    const fetchTotalInvoices = async () => {
      try {
        const response = await fetch("https://decryptic.online/php2/getTodayInvoice.php");
        const data = await response.json();
        setTotalInvoices(parseInt(data.total_invoices || 0, 10));
      } catch (error) {
        console.error("Error fetching total invoices:", error);
      }
    };

    const fetchTotalItems = async () => {
      try {
        const response = await fetch("https://decryptic.online/php2/getTotalItems.php");
        const data = await response.json();
        setTotalItems(parseInt(data.total_items || 0, 10));
      } catch (error) {
        console.error("Error fetching total items:", error);
      }
    };

    fetchDailyEarnings();
    fetchTotalInvoices();
    fetchTotalItems();
  }, []);

  // Prepare chart data
  const chartData =
    dailyEarnings !== null && totalInvoices !== null && totalItems !== null
      ? [
          { name: "Daily Earnings", value: dailyEarnings },
          { name: "Total Invoices", value: totalInvoices },
          { name: "Total Items", value: totalItems },
        ]
      : [];

  console.log("Chart Data:", chartData); // Debugging: Log chart data to verify

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-chart">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
