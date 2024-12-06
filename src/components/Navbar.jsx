import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBoxes, faCashRegister } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <button onClick={toggleSidebar} className="menu-btn">
          ☰
        </button>


        <Link to="/Dashboard">
 <div className="navbar-logo-container">
 <img
            src={darkMode ? "/img/Logod.png" : "/img/Logol.png"}
            alt="LiteCart Logo"
  className="navbar-logo"
/>
  </div>
</Link>
        <div className="toggle-container">
          <input
            type="checkbox"
            id="check"
            className="toggle"
            onChange={toggleTheme}
            checked={darkMode}
          />
          <label htmlFor="check"></label>
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <ul className="menu">
          <li>
            <Link to="/Dashboard">
              <FontAwesomeIcon icon={faHome} />
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <FontAwesomeIcon icon={faBoxes} />
              {sidebarOpen && <span>Inventory</span>}
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faCashRegister} />
              {sidebarOpen && <span>POS</span>}
            </Link>
          </li>
        </ul>
      </div>
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}


export default Navbar;
