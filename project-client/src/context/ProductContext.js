import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [soldedProducts, setSoldedProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const values = {
    products,
    setProducts,
    selectedProduct,
    setSelectedProduct,
    purchasedProducts,
    setPurchasedProducts,
    soldedProducts,
    setSoldedProducts,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
