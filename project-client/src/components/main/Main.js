import React, { useEffect } from "react";
import Products from "../product/Products";
import Brands from "../brand/Brands";
import Colors from "../color/Colors";
import { Routes, Route, NavLink } from "react-router-dom";
import Categories from "../category/Categories";
import { useUserContext } from "../../context/UserContext";
import { getUserById } from "../../services/userService";
import { getFromLocalStorage } from "../../services/localStorageService";

function Main() {
  const { selectedUser } = useUserContext();

  return (
    <div className="grid grid-cols-10 w-full px-14 m-auto">
      <div className="col-span-2 py-10 pr-5">
        <NavLink
          to={`products/user/${selectedUser.userId}`}
          className="px-2 rounded py-2 border-b-2 font-bold w-full block mb-5 shadow-item bg-white"
        >
          Ürünlerim
        </NavLink>

        <Categories />
        <Brands />
        <Colors />
      </div>
      <div className="col-span-8 py-10 pl-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/user/:ownerId" element={<Products />} />
          <Route path="/products/brand/:brandId" element={<Products />} />
          <Route path="/products/color/:colorId" element={<Products />} />
          <Route path="/products/category/:categoryId" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
