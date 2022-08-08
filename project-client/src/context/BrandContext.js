import { createContext, useContext, useState } from "react";

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(false);

  const values = {
    brands,
    setBrands,
    selectedBrand,
    setSelectedBrand,
    updateStatus,
    setUpdateStatus,
  };

  return (
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
};

export const useBrandContext = () => useContext(BrandContext);
