import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Users from "./Users";
import Products from "../product/Products";
import ControlBrands from "./control/ControlBrands";
import ControlColors from "./control/ControlColors";
import ControlCategories from "./control/ControlCategories";

function DashBoard() {
  return (
    <div className="grid grid-cols-10 w-11/12 m-auto">
      <div className="col-span-2 py-10 pr-5">
        <div className="bg-white  rounded-lg flex flex-col shadow-item ">
          <NavLink to={"products"} className="px-2  rounded py-2 border-b-2">
            Ürünler
          </NavLink>
          <NavLink
            to={`controlCategories`}
            className="px-2  rounded py-2 border-b-2"
          >
            Kategoriler
          </NavLink>
          <NavLink
            to={"controlBrands"}
            className="px-2 rounded py-2 border-b-2"
          >
            Markalar
          </NavLink>
          <NavLink
            to={`controlColors`}
            className="px-2  rounded py-2 border-b-2"
          >
            Renkler
          </NavLink>
          <NavLink to={`users`} className="px-2 rounded py-2 border-b-2">
            Kullanıcılar
          </NavLink>
        </div>
      </div>
      <div className="col-span-8 py-10 pl-5">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/controlBrands" element={<ControlBrands />} />
          <Route path="/controlColors" element={<ControlColors />} />
          <Route path="/controlCategories" element={<ControlCategories />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashBoard;
