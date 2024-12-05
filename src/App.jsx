import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import InventoryManagement from "./pages/InventoryManagement";
import POS from "./pages/POS";


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<div className="main-content"><Dashboard /></div>} />
            <Route path="/inventory" element={<div className="main-content"><InventoryManagement /></div>} />
            <Route path="/pos" element={<div className="main-content"><POS /></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
