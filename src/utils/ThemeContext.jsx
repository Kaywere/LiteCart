import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Dynamically update CSS variables for the page and navbar separately
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      // Page background and text
      root.style.setProperty('--bg-color', '#1e1e1e'); // Dark page background
      root.style.setProperty('--text-color', '#f1f1f1'); // Dark page text

      // Navbar-specific variables
      root.style.setProperty('--navbar-bg-color', '#333333'); // Dark navbar background
      root.style.setProperty('--navbar-text-color', '#ffffff'); // Dark navbar text
    } else {
      // Page background and text
      root.style.setProperty('--bg-color', '#f9f9f9'); // Light page background
      root.style.setProperty('--text-color', '#333333'); // Light page text

      // Navbar-specific variables
      root.style.setProperty('--navbar-bg-color', '#dd3f3f1a'); // Light navbar background
      root.style.setProperty('--navbar-text-color', '#333333'); // Light navbar text
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
