import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { removeFromLocalStorage } from "../../services/localStorageService";
import { FaBeer } from "react-icons/fa";

function Navi() {
  const { isAdmin, isLogged, setIsLogged } = useAuthContext();
  const { selectedUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLogged(false);
    removeFromLocalStorage("isLogged");
    removeFromLocalStorage("token");
    removeFromLocalStorage("userId");
    removeFromLocalStorage("productId");
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
        <div className="text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-item  ${isActive ? "active-nav" : ""}`
            }
          >
            Anasayfa
          </NavLink>
          <NavLink
            to="/main"
            className={({ isActive }) =>
              `ml-10 nav-item ${isActive ? "active-nav" : ""}`
            }
          >
            Ürünler
          </NavLink>

          {isLogged && (
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                `ml-10 nav-item ${isActive ? "active-nav" : ""}`
              }
            >
              Ürün Sat
            </NavLink>
          )}
        </div>
        <div className="flex  items-center">
          {isAdmin && (
            <NavLink
              className={({ isActive }) =>
                "btn bg-littleDarkBlue shadow-item2 text-white mr-5"
              }
              to={"/dashboard"}
            >
              Kontrol Paneli
            </NavLink>
          )}

          {!isLogged && (
            <>
              <NavLink
                className={({ isActive }) =>
                  "btn  bg-darkBlue shadow-item text-white mr-5"
                }
                to={"/login"}
              >
                Giriş Yap
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  "btn bg-darkBlue shadow-item text-white"
                }
                to={"/register"}
              >
                Kayıt Ol
              </NavLink>
            </>
          )}
          {isLogged && (
            <div className="group relative">
              <button className="flex items-center bg-darkBlue border-4 border-white shadow-item2 text-white py-2 ml-5 rounded-xl px-4 text-base">
                <span>
                  {selectedUser.firstName + " " + selectedUser.lastName}
                </span>
              </button>
              <div className="invisible absolute top-full right-0 w-64 rounded p-1 bg-white flex flex-col z-10 group-focus-within:visible group-focus-within:mt-4  transition-all  font-medium shadow-item2">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Hesabım
                </NavLink>
                <NavLink
                  to="/profile/takenOffers"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Aldığım Teklifler
                </NavLink>
                <NavLink
                  to="/profile/givenOffers"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Verdiğim Teklifler
                </NavLink>
                <NavLink
                  to="/profile/purchasedProducts"
                  className={({ isActive }) =>
                    "text-base inline-flex py-2 px-2 items-center rounded hover:bg-gray-200 border-b-2"
                  }
                >
                  Aldığım Ürünler
                </NavLink>
                <NavLink
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
