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
    <div className="px-32">
      <div className="h-[400px] w-full  bg-white rounded-2xl p-10  shadow-item2 bg-home-bg bg-cover bg-center flex items-end mt-10">
        <div className="flex">
          <NavLink
            to={"/main"}
            className="btn px-10 text-base rounded-2xl py-3 font-bold mr-6 text-center flex justify-center items-center bg-white text-darkBlue hover:bg-darkBlue hover:text-white transition-all duration-15"
          >
            Ürün Al
          </NavLink>
          <NavLink
            to={"/addProduct"}
            className="btn px-10 text-base rounded-2xl py-3 font-bold mr-6 text-center flex justify-center items-center bg-white text-darkBlue hover:bg-darkBlue hover:text-white transition-all duration-150"
          >
            Ürün Sat
          </NavLink>
        </div>
      </div>
      <div className="w-11/12 m-auto my-24">
        <div className="text-3xl mb-5 font-bold">Güncel İlanlar</div>
        <Products limit={8} />
      </div>
    </div>
  );
}

export default Home;
