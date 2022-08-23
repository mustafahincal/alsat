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
    <div>
      {brands.length !== 0 && (
        <div className="bg-white  rounded-lg flex flex-col shadow-item2 mt-10 dark:bg-gray-800 dark:text-white">
          <NavLink
            to="/main/products/"
            className="px-2 rounded py-2 border-b-2 font-bold dark:border-gray-600"
          >
            Tüm Markalar
          </NavLink>
          {brands.map((brand) => (
            <NavLink
              to={`/main/products/brand/${brand.brandId}`}
              className={"px-2 rounded py-2 border-b-2 dark:border-gray-600"}
              key={brand.brandId}
            >
              {brand.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Brands;
