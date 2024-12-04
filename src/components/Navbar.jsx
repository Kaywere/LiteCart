import React from 'react';
import { useTheme } from '../utils/ThemeContext';
import '../styles/Navbar.css';

function Navbar() {
  const { darkMode, toggleTheme } = useTheme(); 

  return (
    <nav className="navbar">
      <h1 className="text-xl font-bold">LiteCart</h1>

      <div className="toggle-container">
        <input
          type="checkbox"
          id="check"
          className="toggle"
          onChange={toggleTheme} 
          checked={darkMode} 
        />
        <label htmlFor="check"></label> {}
      </div>
    </nav>
  );
}

export default Navbar;
