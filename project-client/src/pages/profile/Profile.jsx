import React, { useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ChangePassword from "../../components/profile/ChangePassword";
import UpdateUser from "../../components/profile/UpdateUser";
import { useUserContext } from "../../context/UserContext";
import TakenOffers from "../../components/profile/TakenOffers";
import GivenOffers from "../../components/profile/GivenOffers";
import ProfileMain from "../../components/profile/ProfileMain";
import SoldedProducts from "../../components/profile/SoldedProducts";
import PurchasedProducts from "../../components/profile/PurchasedProducts";
import CreditCard from "../../components/profile/CreditCard";

function Profile() {
  return (
    <div className="grid grid-cols-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 m-auto">
      <div className="col-span-10 lg:col-span-2 py-10 lg:pr-5 order-2 lg:order-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg flex flex-col shadow-item ">
          <NavLink
            to={"profilDetails"}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Hesabım
          </NavLink>
          <NavLink
            to={"givenOffers"}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Verilen Teklifler
          </NavLink>
          <NavLink
            to={"takenOffers"}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Alınan Teklifler
          </NavLink>
          <NavLink
            to={"soldedproducts"}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Satılan Ürünler
          </NavLink>
          <NavLink
            to={"purchasedproducts"}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Alınan Ürünler
          </NavLink>
          <NavLink
            to={"changePassword"}
            className="px-2  rounded py-2 border-b-2  dark:border-gray-600"
          >
            Şifre Değiştir
          </NavLink>
          <NavLink
            to={"creditCard"}
            className="px-2  rounded py-2 border-b-2 dark:border-gray-600"
          >
            Kayıtlı Kartlarım
          </NavLink>
          <NavLink
            to={"updateUser"}
            className="px-2 rounded py-2 border-b-2 dark:border-gray-600"
          >
            Bilgileri Değiştir
          </NavLink>
        </div>
      </div>
      <div className="col-span-10 lg:col-span-8 py-10 lg:pl-5 order-1 lg:order-2">
        <Routes>
          <Route path="/" element={<ProfileMain />} />
          <Route path="/profilDetails" element={<ProfileMain />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/updateUser" element={<UpdateUser />} />
          <Route path="/takenOffers" element={<TakenOffers />} />
          <Route path="/givenOffers" element={<GivenOffers />} />
          <Route path="/soldedProducts" element={<SoldedProducts />} />
          <Route path="/creditCard" element={<CreditCard />} />
          <Route path="/purchasedProducts" element={<PurchasedProducts />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
