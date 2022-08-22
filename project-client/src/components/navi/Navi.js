import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { removeFromLocalStorage } from "../../services/localStorageService";

import { CgProfile } from "react-icons/cg";
import { useNaviContext } from "../../context/NaviContext";
import { useProductContext } from "../../context/ProductContext";
import { useBrandContext } from "../../context/BrandContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { useColorContext } from "../../context/ColorContext";
import { useOfferContext } from "../../context/OfferContext";
import { usePaymentContext } from "../../context/PaymentContext";

function Navi() {
  const { isAdmin, isLogged, setIsLogged, setIsAdmin, setCounter } =
    useAuthContext();
  const { selectedUser, setSelectedUser } = useUserContext();
  const { setSelectedCreditCard } = usePaymentContext();
  const { visible, setVisible } = useNaviContext();
  const {
    setProducts,
    setSelectedProduct,
    setPurchasedProducts,
    setSoldedProducts,
  } = useProductContext();
  const { setSelectedBrand, setUpdateBrandStatus } = useBrandContext();
  const { setSelectedCategory, setUpdateCategoryStatus } = useCategoryContext();
  const { setSelectedColor, setUpdateColorStatus } = useColorContext();
  const { setGivenOffers, setTakenOffers, setSelectedOffer } =
    useOfferContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLogged(false);
    setIsAdmin(false);
    setSelectedUser({});
    setSelectedCreditCard({});
    setProducts([]);
    setSoldedProducts([]);
    setSelectedProduct({});
    setPurchasedProducts([]);
    setCounter(0);
    setSelectedBrand({});
    setUpdateBrandStatus(false);
    setSelectedCategory({});
    setUpdateCategoryStatus(false);
    setSelectedColor({});
    setUpdateColorStatus(false);
    setGivenOffers([]);
    setTakenOffers([]);
    setSelectedOffer({});

    removeFromLocalStorage("isLogged");
    removeFromLocalStorage("token");
    removeFromLocalStorage("userId");
    removeFromLocalStorage("productId");
    removeFromLocalStorage("isAdmin");

    setVisible(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-3 px-32 bg-white text-black font-bold border-b-2 border-gray-300">
        <NavLink
          to="/"
          className={({ isActive }) => "logo text-6xl font-dancing"}
        >
          alsat
        </NavLink>
        <div className="flex  items-center text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `group relative ${isActive ? "active-nav" : ""}`
            }
          >
            Anasayfa
            <div className="w-0 h-[3px] rounded-lg bg-black absolute top group-hover:w-full transition-all duration-75"></div>
          </NavLink>
          <NavLink
            to="/main"
            className={({ isActive }) =>
              `ml-10 group  relative ${isActive ? "active-nav" : ""}`
            }
          >
            Ürünler
            <div className="w-0 h-[3px] rounded-lg bg-black absolute top group-hover:w-full transition-all duration-75"></div>
          </NavLink>

          {isLogged && (
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                `group relative ml-10 ${isActive ? "active-nav" : ""}`
              }
            >
              Ürün Sat
              <div className="w-0 h-[3px] rounded-lg bg-black absolute top group-hover:w-full transition-all duration-75"></div>
            </NavLink>
          )}
          {isLogged && isAdmin && (
            <NavLink
              className={({ isActive }) =>
                "btn bg-littleDarkBlue shadow-item2 text-white  ml-10 text-base"
              }
              to={"/dashboard"}
            >
              Kontrol Paneli
            </NavLink>
          )}

          {!isLogged && (
            <div className="ml-10">
              <NavLink
                className={({ isActive }) =>
                  "btn  bg-darkBlue shadow-item text-white mr-5 text-base"
                }
                to={"/login"}
              >
                Giriş Yap
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  "btn bg-darkBlue shadow-item text-white text-base"
                }
                to={"/register"}
              >
                Kayıt Ol
              </NavLink>
            </div>
          )}
          {isLogged && (
            <div className="group relative">
              <button className="flex items-center bg-darkBlue border-4 border-white shadow-item2 text-white py-2 rounded-xl px-4 text-base ml-10">
                <span
                  onClick={() => setVisible(!visible)}
                  className="flex items-center"
                >
                  <div className="mr-3 flex justify-center items-center">
                    <CgProfile className="text-2xl" />
                  </div>
                  <div>
                    {selectedUser.firstName + " " + selectedUser.lastName}
                  </div>
                </span>
              </button>
              <div
                className={`absolute top-full right-0 w-64 rounded p-1 bg-white flex flex-col z-10 duration-25 transition-all font-medium shadow-item2  ${
                  visible ? " visible mt-4" : " invisible mt-2"
                } `}
              >
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Hesabım
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/takenOffers"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Aldığım Teklifler
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/givenOffers"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Verdiğim Teklifler
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/purchasedProducts"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Aldığım Ürünler
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/soldedProducts"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Sattığım Ürünler
                </NavLink>
                <span
                  className="border-b-2 border-red-200 cursor-pointer text-base py-2 px-2 items-center rounded  text-red-500  hover:bg-red-500 hover:text-white"
                  onClick={() => handleLogOut()}
                >
                  Çıkış Yap
                </span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navi;
