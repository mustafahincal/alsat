import React, { useEffect } from "react";
import { getCategories } from "../../services/categoryService";
import { useCategoryContext } from "../../context/CategoryContext";
import { NavLink } from "react-router-dom";

function Home() {
  const { categories, setCategories } = useCategoryContext();

  useEffect(() => {
    getCategories().then((result) => setCategories(result.data));
  }, []);

  return (
    <div className="px-32 ">
      <div className="flex items-center justify-between bg-white  rounded-2xl px-10 py-3 my-5 shadow-item2">
        <span className="text-xl  bg-darkBlue text-white py-2 px-5 rounded-xl">
          Kategoriler
        </span>
        <div className="flex justify-between w-4/5">
          {categories.map((category) => (
            <NavLink
              to={`/main/products/category/${category.categoryId}`}
              key={category.categoryId}
              className="hover:bg-darkBlue hover:text-white py-2 px-3 transition-all rounded-lg border-2 border-darkBlue"
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="h-80 w-full  bg-white rounded-2xl p-10  shadow-item2">
        <p className="text-5xl font-bold ">alsat </p>
      </div>
    </div>
  );
}

export default Home;
