import { createContext, useContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../services/localStorageService";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const root = window.document.documentElement;
  useEffect(() => {
    const theme = getFromLocalStorage("theme");
    if (theme === "true") {
      setDarkMode(true);
      root.classList.add("dark");
    } else {
      setDarkMode(false);
      root.classList.add("light");
    }
  }, []);

  const handleDarkMode = () => {
    root.classList.remove(!darkMode ? "light" : "dark");
    root.classList.add(!darkMode ? "dark" : "light");

    setToLocalStorage("theme", !darkMode);

    setDarkMode(!darkMode);
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
