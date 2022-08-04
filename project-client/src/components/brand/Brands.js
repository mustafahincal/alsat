import { useEffect } from "react";
import { getBrands } from "../../services/brandService";
import { NavLink } from "react-router-dom";
import { useBrandContext } from "../../context/BrandContext";

function Brands() {
  const { brands, setBrands } = useBrandContext();
  useEffect(() => {
    getBrands()
      .then((response) => setBrands(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-white  rounded-lg flex flex-col shadow-item my-10">
      <NavLink
        to="/main/products/"
        className="px-2 rounded py-2 border-b-2 font-bold"
      >
        Tüm Markalar
      </NavLink>
      {brands.map((brand) => (
        <NavLink
          to={`/main/products/brand/${brand.brandId}`}
          className={"px-2 rounded py-2 border-b-2 "}
          key={brand.brandId}
        >
          {brand.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Brands;
