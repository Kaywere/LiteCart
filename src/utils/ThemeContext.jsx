import React, { createContext, useState, useContext, useEffect } from 'react';


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode); 
  };

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      
      root.style.setProperty('--bg-color', '#1e1e1e'); 
      root.style.setProperty('--text-color', '#f1f1f1'); 
      root.style.setProperty('--toggle-bg', '#1a237e'); 
      root.style.setProperty('--toggle-fg', '#e3f2fd');
      root.style.setProperty('--navbar-bg-color', '#333333'); // Dark navbar background
      root.style.setProperty('--navbar-text-color', '#ffffff'); // Dark navbar text
    } else {
      
      root.style.setProperty('--bg-color', '#f9f9f9');
      root.style.setProperty('--text-color', '#333333'); 
      root.style.setProperty('--toggle-bg', '#ffeb3b'); 
      root.style.setProperty('--toggle-fg', '#fff59d'); 
      root.style.setProperty('--navbar-bg-color', '#cbdbf5'); // Light navbar background
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
