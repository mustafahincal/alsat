import { createContext, useContext, useEffect, useState } from "react";
import { getFromLocalStorage } from "../services/localStorageService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (getFromLocalStorage("isLogged")) {
      setIsLogged(true);
    }
    if (getFromLocalStorage("isAdmin")) {
      setIsAdmin(true);
    }
  }, []);

  const values = {
    isAdmin,
    setIsAdmin,
    isLogged,
    setIsLogged,
    counter,
    setCounter,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
