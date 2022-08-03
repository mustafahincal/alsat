import React from "react";
import Products from "../product/Products";
import Brands from "../brand/Brands";
import Colors from "../color/Colors";
import { Routes, Route } from "react-router-dom";
import Categories from "../category/Categories";

function Main() {
  return (
    <div className="grid grid-cols-10 w-11/12 m-auto">
      <div className="col-span-2 py-10 pr-5">
        <Categories />
        <Brands />
        <Colors />
      </div>
      <div className="col-span-8 py-10 pl-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/brand/:brandId" element={<Products />} />
          <Route path="/products/color/:colorId" element={<Products />} />
          <Route path="/products/category/:categoryId" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
