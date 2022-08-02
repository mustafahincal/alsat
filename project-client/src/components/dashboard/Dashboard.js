import React from "react";
import products from "../car/products";
import { Routes, Route, NavLink } from "react-router-dom";
import AddBrand from "./add/AddBrand";
import AddColor from "./add/AddColor";
import AddModel from "./add/AddModel";

import CreditCards from "./CreditCards";
import Rentals from "./Rentals";
import Users from "./Users";

function DashBoard() {
  return (
    <div className="grid grid-cols-10 w-11/12 m-auto">
      <div className="col-span-2 py-10 pr-5">
        <div className="bg-white  rounded-lg flex flex-col shadow-item ">
          <NavLink
            to={"products"}
            className="px-2  rounded py-2 border-b-2 hover:bg-gray-200"
          >
            Arabalar
          </NavLink>
          <NavLink
            to={"addBrand"}
            className="px-2 rounded py-2 border-b-2 hover:bg-gray-200"
          >
            Markalar
          </NavLink>
          <NavLink
            to={"addModel"}
            className="px-2 rounded py-2 border-b-2 hover:bg-gray-200"
          >
            Modeller
          </NavLink>
          <NavLink
            to={`addColor`}
            className="px-2  rounded py-2 border-b-2 hover:bg-gray-200"
          >
            Renkler
          </NavLink>
          <NavLink
            to={`users`}
            className="px-2 rounded py-2 border-b-2 hover:bg-gray-200"
          >
            Kullanıcılar
          </NavLink>
          <NavLink
            to={"creditCards"}
            className="px-2  rounded py-2 border-b-2 hover:bg-gray-200"
          >
            Kredi Kartları
          </NavLink>
          <NavLink
            to={`rentals`}
            className="px-2  rounded py-2 border-b-2 hover:bg-gray-200"
          >
            Kiralanan Araçlar
          </NavLink>
        </div>
      </div>
      <div className="col-span-8 py-10 pl-5">
        <Routes>
          <Route path="/products" element={<products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/creditCards" element={<CreditCards />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/addBrand" element={<AddBrand />} />
          <Route path="/addModel" element={<AddModel />} />
          <Route path="/addColor" element={<AddColor />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashBoard;
