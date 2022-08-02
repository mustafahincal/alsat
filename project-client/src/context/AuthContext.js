import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const values = {
    isAdmin,
    setIsAdmin,
    isLogged,
    setIsLogged,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
