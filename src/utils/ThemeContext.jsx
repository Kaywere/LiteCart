import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from "use-local-storage";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", preference);

  
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode); 
  };

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      
                  // Dark 
      root.style.setProperty('--toggle-bg', '#1a237e'); 
      root.style.setProperty('--toggle-fg', '#e3f2fd');
      root.style.setProperty('--navbar-bg-color', '#333333'); 
      root.style.setProperty('--navbar-text-color', '#ffffff');    
      root.style.setProperty('--bg-color', '#1e1e1e'); 
      root.style.setProperty('--text-color', '#f1f1f1'); 
      root.style.setProperty('--sidebar-btn-bg-color', '#ffffff33'); 
    } else {
      
                     // Light
      root.style.setProperty('--toggle-bg', '#ffeb3b'); 
      root.style.setProperty('--toggle-fg', '#fff59d'); 
      root.style.setProperty('--navbar-bg-color', '#cbdbf5');
      root.style.setProperty('--navbar-text-color', '#333333'); 
      root.style.setProperty('--bg-color', '#f9f9f9');
      root.style.setProperty('--text-color', '#333333'); 
      root.style.setProperty('--sidebar-btn-bg-color', '#ffffff'); 
    }
  }, [darkMode]); 

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
