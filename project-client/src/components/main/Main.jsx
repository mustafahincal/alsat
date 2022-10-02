import React, { useEffect } from "react";
import Products from "../product/Products";
import Brands from "../brand/Brands";
import Colors from "../color/Colors";
import { Routes, Route, NavLink } from "react-router-dom";
import Categories from "../category/Categories";
import { useUserContext } from "../../context/UserContext";
import { getUserById } from "../../services/userService";
import { getFromLocalStorage } from "../../services/localStorageService";
import { useNaviContext } from "../../context/NaviContext";
import UsingStates from "../usingState/UsingStates";

function Main() {
  const { selectedUser } = useUserContext();

  return (
    <div className="grid grid-cols-10 w-full m-auto py-14 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="col-span-10 order-2 md:order-1 md:col-span-2  md:pr-5">
        <NavLink
          to={`products/user/${selectedUser.userId}`}
          className={({ isActive }) =>
            `px-2 rounded py-2 border-b-2 font-bold w-full block mb-5 shadow-item2 bg-white dark:bg-gray-800 dark:border-gray-600 ${
              isActive
                ? "dark:bg-gray-300 dark:text-black bg-darkBlue text-white"
                : ""
            }`
          }
        >
          Ürünlerim
        </NavLink>

        <Categories />
        <Brands />
        <Colors />
        <UsingStates />
      </div>
      <div className="col-span-10 mb-24 order-1 md:order-2 md:col-span-8 md:pl-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/user/:ownerId" element={<Products />} />
          <Route path="/products/brand/:brandId" element={<Products />} />
          <Route path="/products/color/:colorId" element={<Products />} />
          <Route
            path="/products/usingState/:usingStateId"
            element={<Products />}
          />
          <Route path="/products/category/:categoryId" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
