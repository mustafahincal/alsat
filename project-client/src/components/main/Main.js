import React from "react";
import products from "../car/products";
import Brands from "..//brand/Brands";
import Colors from "../color/Colors";
import { Routes, Route } from "react-router-dom";

function Main() {
  return (
    <div className="grid grid-cols-10 w-11/12 m-auto">
      <div className="col-span-2 py-10 pr-5">
        <Brands />
        <Colors />
      </div>
      <div className="col-span-8 py-10 pl-5">
        <Routes>
          <Route path="/" element={<products />} />
          <Route path="/products" element={<products />} />
          <Route path="/products/brand/:brandId" element={<products />} />
          <Route path="/products/color/:colorId" element={<products />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
