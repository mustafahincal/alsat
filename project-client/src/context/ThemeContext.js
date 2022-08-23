import { createContext, useContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../services/localStorageService";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = getFromLocalStorage("theme");
    if (theme) setDarkMode(theme);
  }, []);

  const handleDarkMode = () => {
    const root = window.document.documentElement;
    setDarkMode(!darkMode);
    root.classList.remove(darkMode ? "light" : "dark");
    root.classList.add(darkMode ? "dark" : "light");

    setToLocalStorage("theme", darkMode);
  };

  const values = {
    darkMode,
    setDarkMode,
    handleDarkMode,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
