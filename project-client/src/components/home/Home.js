import React, { useEffect } from "react";
import { getCategories } from "../../services/categoryService";
import { useCategoryContext } from "../../context/CategoryContext";
import { NavLink } from "react-router-dom";
import Products from "../product/Products";

function Home() {
  const { categories, setCategories } = useCategoryContext();

  useEffect(() => {
    getCategories().then((result) => setCategories(result.data));
  }, []);

  return (
    <div className="px-32 ">
      <div className="flex items-center justify-between bg-white  rounded-2xl px-10 py-3 mb-10 shadow-item2">
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
      <div className="h-[400px] w-full  bg-white rounded-2xl p-10  shadow-item2 bg-home-bg bg-cover bg-center flex items-end">
        <div className="flex">
          <NavLink
            to={"/main"}
            className="btn w-48 text-base rounded-2xl py-4 font-bold mr-6 text-center"
          >
            Ürün Al
          </NavLink>
          <NavLink
            to={"/addProduct"}
            className="btn w-48 text-base rounded-2xl py-4 font-bold text-center"
          >
            Ürün Sat
          </NavLink>
        </div>
      </div>
      <div className="w-11/12 m-auto my-24">
        <div className="text-3xl mb-5 font-bold">Güncel İlanlar</div>
        <Products />
      </div>
    </div>
  );
}

export default Home;
