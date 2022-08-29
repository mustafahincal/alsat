import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { removeFromLocalStorage } from "../../services/localStorageService";
import { GoThreeBars } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useNaviContext } from "../../context/NaviContext";
import { useProductContext } from "../../context/ProductContext";
import { useBrandContext } from "../../context/BrandContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { useColorContext } from "../../context/ColorContext";
import { useOfferContext } from "../../context/OfferContext";
import { usePaymentContext } from "../../context/PaymentContext";
import { useThemeContext } from "../../context/ThemeContext";

function Navi() {
  const { isAdmin, isLogged, setIsLogged, setIsAdmin, setCounter } =
    useAuthContext();
  const { selectedUser, setSelectedUser } = useUserContext();
  const { setSelectedCreditCard } = usePaymentContext();
  const { visible, setVisible, bar, setBar, setSidebarStatus, sidebarStatus } =
    useNaviContext();

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
  const { handleDarkMode } = useThemeContext();
  const navigate = useNavigate();

  useEffect(() => {
    setBar(false);
    setSidebarStatus(false);
  }, []);

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

  const sidebar = () => {
    setBar(!bar);
  };

  const windowSize = () => {
    if (window.innerWidth < 768) {
      setSidebarStatus(true);
    } else {
      setSidebarStatus(false);
    }
  };

  window.addEventListener("resize", windowSize);

  return (
    <div>
      <nav className="flex justify-between items-center py-3 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-white text-black font-bold border-b-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white relative">
        <button className="text-4xl md:hidden" onClick={sidebar}>
          <GoThreeBars />
        </button>
        <NavLink
          to="/"
          className={({ isActive }) =>
            "logo text-6xl font-dancing flex items-center"
          }
        >
          alsat
        </NavLink>
        <div className="flex  items-center text-xl ">
          <div
            className={`${bar ? "activeSide" : " "} ${
              sidebarStatus ? "sidebar" : " "
            }  flex items-center`}
          >
            <div className="flex order-3 md:order-1 flex-col md:flex-row mt-5 md:mt-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `group relative ${isActive ? "active-nav" : ""} `
                }
                onClick={sidebar}
              >
                Anasayfa
                <div className="w-0 h-[3px] rounded-lg bg-black absolute top group-hover:w-full transition-all dark:bg-white duration-75"></div>
              </NavLink>
              <NavLink
                to="/main"
                className={({ isActive }) =>
                  `mt-5 md:mt-0 md:ml-10 group relative ${
                    isActive ? "active-nav" : ""
                  }
                   `
                }
                onClick={sidebar}
              >
                Ürünler
                <div className="w-0 h-[3px] rounded-lg bg-black absolute top group-hover:w-full transition-all dark:bg-white duration-75"></div>
              </NavLink>

              {isLogged && (
                <NavLink
                  to="/addProduct"
                  className={({ isActive }) =>
                    `mt-5 md:mt-0 group relative md:ml-10 md:mr-5 ${
                      isActive ? "active-nav" : ""
                    } `
                  }
                  onClick={sidebar}
                >
                  Ürün Sat
                  <div className="w-0 h-[3px] rounded-lg bg-black absolute top group-hover:w-full transition-all dark:bg-white duration-75"></div>
                </NavLink>
              )}
            </div>
            {isLogged && isAdmin && (
              <NavLink
                className={({ isActive }) =>
                  "btn bg-sky-400 shadow-item2 text-white  text-base dark:bg-sky-300 dark:text-black md:ml-3 order-2 md:order-2"
                }
                to={"/dashboard"}
                onClick={sidebar}
              >
                Kontrol Paneli
              </NavLink>
            )}

            {!isLogged && (
              <div className="md:ml-10 flex items-center order-1 md:order-3">
                <NavLink
                  className={({ isActive }) =>
                    "btn  bg-darkBlue shadow-item text-white mr-2 sm:mr-5 text-base"
                  }
                  to={"/login"}
                  onClick={sidebar}
                >
                  Giriş Yap
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    "btn bg-darkBlue shadow-item text-white text-base"
                  }
                  to={"/register"}
                  onClick={sidebar}
                >
                  Kayıt Ol
                </NavLink>
              </div>
            )}
          </div>

          {isLogged && (
            <div className="group relative">
              <button className="flex items-center bg-darkBlue shadow-item2 text-white py-2 rounded-md px-4 text-base ml-6 dark:bg-gray-200 dark:text-black">
                <span
                  onClick={() => setVisible(!visible)}
                  className="flex items-center"
                >
                  <div className="mr-3 flex justify-center items-center">
                    <CgProfile className="text-2xl" />
                  </div>
                  <div className="hidden sm:block">
                    {selectedUser.firstName + " " + selectedUser.lastName}
                  </div>
                  <div className="ml-0 sm:ml-3 flex justify-center items-center text-black">
                    <IoIosArrowDown className="text-2xl dark:text-black text-white" />
                  </div>
                </span>
              </button>
              <div
                className={`absolute top-full right-0 w-64 rounded p-1 bg-white flex flex-col z-10 duration-25 transition-all font-medium shadow-item2 dark:bg-gray-800 dark:text-white   ${
                  visible ? " visible mt-4" : " invisible mt-2"
                } `}
              >
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200  border-b-2 dark:hover:bg-gray-700 dark:border-gray-700"
                  }
                >
                  Hesabım
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/givenOffers"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2  dark:hover:bg-gray-700 dark:border-gray-700"
                  }
                >
                  Verilen Teklifler
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/takenOffers"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2  dark:hover:bg-gray-700 dark:border-gray-700"
                  }
                >
                  Alınan Teklifler
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/soldedProducts"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2  dark:hover:bg-gray-700 dark:border-gray-700"
                  }
                >
                  Satılan Ürünler
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/purchasedProducts"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2  dark:hover:bg-gray-700 dark:border-gray-700"
                  }
                >
                  Alınan Ürünler
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/changePassword"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2  dark:hover:bg-gray-700 dark:border-gray-700"
                  }
                >
                  Şifre Değiştir
                </NavLink>
                <NavLink
                  onClick={() => setVisible(!visible)}
                  to="/profile/creditcard"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2  dark:hover:bg-gray-700 dark:border-gray-700"
                  }
                >
                  Kayıtlı Kartlarım
                </NavLink>

                <span
                  className="border-b-2 border-red-400 cursor-pointer text-base py-2 px-2 items-center rounded  text-red-500  hover:bg-red-500 hover:text-white "
                  onClick={() => handleLogOut()}
                >
                  Çıkış Yap
                </span>
              </div>
            </div>
          )}

          <div
            href="#"
            onClick={handleDarkMode}
            className="btn bg-gray-700 text-white text-base ml-3 sm:ml-6 cursor-pointer dark:bg-yellow-300 dark:text-black py-3"
          >
            <span className="dark:hidden flex items-center  justify-between">
              <BsFillMoonFill />
            </span>
            <span className="hidden  dark:flex dark:items-center dark:justify-between">
              <BsFillSunFill />
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navi;
