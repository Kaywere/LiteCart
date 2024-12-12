import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import InventoryManagement from "./pages/InventoryManagement";
import POS from "./pages/POS";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/Dashboard" element={<div className="main-content"><Dashboard /></div>} />
            <Route path="/inventory" element={<div className="main-content"><InventoryManagement /></div>} />
            <Route path="/" element={<div className="main-content"><POS /></div>} />
          </Routes>
        </div>
        <Footer/>
    </Router>
  );
}


export default App;
