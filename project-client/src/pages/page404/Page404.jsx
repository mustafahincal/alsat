import React from "react";
import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-1/2 -translate-y-full -translate-x-1/2 left-1/2 text-6xl">
        <p className="mb-5">404 Sayfa Bulunamadı!</p>
        <NavLink
          to={"/"}
          className="block text-center rounded bg-transparent text-3xl dark:border-white dark:text-white border-2  dark:hover:bg-white dark:hover:text-gray-900   transition-all duration-200 py-2 px-6 mt-10 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
        >
          Anasayfa
        </NavLink>
      </div>
    </div>
  );
}

export default Page404;
