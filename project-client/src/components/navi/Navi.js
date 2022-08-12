import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { removeFromLocalStorage } from "../../services/localStorageService";

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
      <nav className="flex justify-between items-center py-5 px-14 bg-white text-black font-bold border-b-2 border-gray-300">
        <NavLink
          to="/"
          className={({ isActive }) => "logo text-6xl font-dancing"}
        >
          alsat
        </NavLink>
        <div className="text-xl">
          <NavLink to="/" className={({ isActive }) => " "}>
            Anasayfa
          </NavLink>
          <NavLink to="/main" className={({ isActive }) => "ml-10"}>
            Ürünler
          </NavLink>

          {isLogged && (
            <NavLink to="/addProduct" className="ml-10">
              Ürün Ekle
            </NavLink>
          )}
        </div>
        <div className="flex  items-center">
          {isAdmin && (
            <NavLink
              className={({ isActive }) =>
                "btn bg-littleDarkBlue text-white mr-5"
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
              <button className="flex items-center bg-darkBlue border-4 border-white shadow-item text-white py-2 ml-5 rounded-xl px-4 text-base">
                <span>
                  {selectedUser.firstName + " " + selectedUser.lastName}
                </span>
              </button>
              <div className="invisible absolute top-14 right-0 w-56 rounded py-3 px-2  bg-darkBlue flex flex-col space-y-2 z-10 group-focus-within:visible group-focus-within:mt-2  transition-all dark:bg-prototurk ">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    "text-sm inline-flex h-8 items-center px-3 rounded text-black bg-gray-200 hover:bg-black hover:text-white"
                  }
                >
                  Hesabım
                </NavLink>
                <span
                  className="cursor-pointer text-sm inline-flex h-8 items-center px-3 bg-gray-200 text-red-500  rounded hover:bg-red-500 hover:text-white"
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
