import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [updateCategoryStatus, setUpdateCategoryStatus] = useState(false);

  const values = {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    updateCategoryStatus,
    setUpdateCategoryStatus,
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
