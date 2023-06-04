import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterByBrand, setFilterByBrand] = useState(0);
  const [filterByColor, setFilterByColor] = useState(0);
  const values = {
    filterByBrand,
    setFilterByBrand,
    filterByColor,
    setFilterByColor,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
