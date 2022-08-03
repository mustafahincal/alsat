import { useEffect } from "react";
import { getBrands } from "../../services/brandService";
import { NavLink } from "react-router-dom";
import { useBrandContext } from "../../context/BrandContext";

function Brand() {
  const { brands, setBrands } = useBrandContext();
  useEffect(() => {
    getBrands()
      .then((response) => setBrands(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-white  rounded-lg flex flex-col shadow-item">
      <NavLink
        to="/main/products/"
        className="px-2 hover:bg-gray-200 rounded py-2 border-b-2 font-bold"
      >
        Tüm Markalar
      </NavLink>
      {brands.map((brand) => (
        <NavLink
          to={`/main/products/brand/${brand.id}`}
          className={"px-2 rounded py-2 border-b-2  hover:bg-gray-200"}
          key={brand.id}
        >
          {brand.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Brand;
