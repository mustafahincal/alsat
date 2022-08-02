import { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([]);

  const values = {
    colors,
    setColors,
  };

  return (
    <ColorContext.Provider value={values}>{children}</ColorContext.Provider>
  );
};

export const useColorContext = () => useContext(ColorContext);
