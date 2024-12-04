import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import InventoryManagement from './pages/InventoryManagement'; // Import the Inventory page
import POS from './pages/POS';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryManagement />} /> {/* Add Inventory Route */}
            <Route path="/pos" element={<POS />} /> {/* Add Inventory Route */}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
