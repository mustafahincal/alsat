import { useEffect, useState } from "react";
import { getColors } from "../../services/colorService";
import { NavLink } from "react-router-dom";
import { useColorContext } from "../../context/ColorContext";

function Color() {
  const { colors, setColors } = useColorContext();
  useEffect(() => {
    getColors().then((result) => setColors(result.data));
  }, []);
  return (
    <div className="bg-white  rounded-lg flex flex-col shadow-item mt-5">
      <NavLink
        to="/main/products/"
        className="px-2 hover:bg-gray-200 rounded py-2 border-b-2 font-bold"
      >
        Tüm Renkler
      </NavLink>
      {colors.map((color) => (
        <NavLink
          to={`/main/products/color/${color.id}`}
          className="px-2  rounded py-2 border-b-2"
          key={color.id}
        >
          {color.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Color;
