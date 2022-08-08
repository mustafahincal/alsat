import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(false);

  const values = {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    updateStatus,
    setUpdateStatus,
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
