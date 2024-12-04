import React from 'react';
import { useTheme } from '../utils/ThemeContext';
import '../styles/Navbar.css';

function Navbar() {
  const { toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h1 className="text-xl font-bold">LiteCart</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  );
}

export default Navbar;
