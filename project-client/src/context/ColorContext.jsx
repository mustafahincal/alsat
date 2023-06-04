import { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
  const [updateColorStatus, setUpdateColorStatus] = useState(false);

  const values = {
    colors,
    setColors,
    selectedColor,
    setSelectedColor,
    updateColorStatus,
    setUpdateColorStatus,
  };

  return (
    <ColorContext.Provider value={values}>{children}</ColorContext.Provider>
  );
};

export const useColorContext = () => useContext(ColorContext);
