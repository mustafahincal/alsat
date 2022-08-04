import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { removeFromLocalStorage } from "../../services/localStorageService";

function Navi() {
  const { isAdmin, isLogged, setIsLogged } = useAuthContext();
  const { selectedUser } = useUserContext();

  const handleLogOut = () => {
    setIsLogged(false);
    removeFromLocalStorage("isLogged");
    removeFromLocalStorage("token");
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-5 px-12 bg-darkBlue text-white font-bold">
        <NavLink to="/" className={({ isActive }) => "logo text-3xl"}>
          LOGO
        </NavLink>
        <div className="text-xl">
          <NavLink to="/  ">Anasayfa</NavLink>
          <NavLink to="/main" className="ml-10">
            Ürünler
          </NavLink>
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
                className={({ isActive }) => "btn bg-gold text-black mr-5"}
                to={"/login"}
              >
                Giriş Yap
              </NavLink>
              <NavLink
                className={({ isActive }) => "btn bg-gold text-black"}
                to={"/register"}
              >
                Kayıt Ol
              </NavLink>
            </>
          )}
          {isLogged && (
            <div className="group relative">
              <button className="flex items-center bg-gold text-black py-2 ml-5 rounded px-4">
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
