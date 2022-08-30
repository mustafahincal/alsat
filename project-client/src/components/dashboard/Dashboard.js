import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ControlUsers from "./control/ControlUsers";
import Products from "../product/Products";
import ControlBrands from "./control/ControlBrands";
import ControlColors from "./control/ControlColors";
import ControlCategories from "./control/ControlCategories";
import ControlUsingStates from "./control/ControlUsingStates";
import ControlProducts from "./control/ControlProducts";
import ControlCreditCards from "./control/ControlCreditCards";
import ControlOffers from "./control/ControlOffers";

function DashBoard() {
  return (
    <div className="grid grid-cols-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 m-auto">
      <div className="col-span-10 lg:col-span-2 py-10 lg:pr-5 order-2 lg:order-1">
        <div className="bg-white  rounded-lg flex flex-col shadow-item dark:bg-gray-800">
          <NavLink
            to={"products"}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Ürünler
          </NavLink>
          <NavLink
            to={`controlCategories`}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Kategoriler
          </NavLink>
          <NavLink
            to={"controlBrands"}
            className="px-2 rounded py-2 border-b-2 dark:border-gray-600"
          >
            Markalar
          </NavLink>
          <NavLink
            to={`controlColors`}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Renkler
          </NavLink>
          <NavLink
            to={`controlUsingStates`}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Kullanım Durumları
          </NavLink>
          <NavLink
            to={`controlOffers`}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Teklifler
          </NavLink>
          <NavLink
            to={`users`}
            className="px-2 rounded py-2 border-b-2 dark:border-gray-600"
          >
            Kullanıcılar
          </NavLink>
          <NavLink
            to={`controlCreditCards`}
            className="px-2 rounded py-2 border-b-2 dark:border-gray-600"
          >
            Kayıtlı Kredi Kartları
          </NavLink>
        </div>
      </div>
      <div className="col-span-10 lg:col-span-8 py-10 lg:pl-5 order-1 lg:order-2">
        <Routes>
          <Route path="/" element={<ControlProducts />} />
          <Route path="/products" element={<ControlProducts />} />
          <Route path="/users" element={<ControlUsers />} />
          <Route path="/controlBrands" element={<ControlBrands />} />
          <Route path="/controlColors" element={<ControlColors />} />
          <Route path="/controlCategories" element={<ControlCategories />} />
          <Route path="/controlUsingStates" element={<ControlUsingStates />} />
          <Route path="/controlCreditCards" element={<ControlCreditCards />} />
          <Route path="/controlOffers" element={<ControlOffers />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashBoard;
