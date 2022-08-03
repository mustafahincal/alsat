import { useEffect } from "react";
import { getColors } from "../../services/colorService";
import { NavLink } from "react-router-dom";
import { useColorContext } from "../../context/ColorContext";

function Colors() {
  const { colors, setColors } = useColorContext();
  useEffect(() => {
    getColors().then((result) => setColors(result.data));
  }, []);
  return (
    <div className="bg-white  rounded-lg flex flex-col shadow-item">
      <NavLink
        to="/main/products/"
        className="px-2  rounded py-2 border-b-2 font-bold"
      >
        Tüm Renkler
      </NavLink>
      {colors.map((color) => (
        <NavLink
          to={`/main/products/color/${color.colorId}`}
          className="px-2  rounded py-2 border-b-2"
          key={color.colorId}
        >
          {color.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Colors;
