import React, { useEffect, useState } from "react";
import {
  getProducts,
  getProductsByBrand,
  getProductsByBrandAndByColor,
  getProductsByColor,
} from "../../services/productService";
import { NavLink, useParams } from "react-router-dom";
import defaultImage from "../../assets/default.png";
import { useProductContext } from "../../context/ProductContext";
import { useBrandContext } from "../../context/BrandContext";
import { useColorContext } from "../../context/ColorContext";
import { useFilterContext } from "../../context/FilterContext";
import { useAuthContext } from "../../context/AuthContext";

function Products() {
  const { products, setProducts } = useProductContext();
  const { brandId, colorId } = useParams();
  const { brands } = useBrandContext();
  const { colors } = useColorContext();
  const { isAdmin } = useAuthContext();
  const { filterByColor, filterByBrand, setFilterByColor, setFilterByBrand } =
    useFilterContext();

  const apiImagesUrl = "https://localhost:44322/uploads/images/";

  useEffect(() => {
    if (brandId) {
      getProductsByBrand(brandId).then((result) => console.log(result.data));
    } else if (colorId) {
      getProductsByColor(colorId).then((result) => console.log(result.data));
    } else {
      getProducts().then((result) => console.log(result.data));
    }
  }, [brandId, colorId]);

  const handleFilter = () => {
    getProductsByBrandAndByColor(filterByBrand, filterByColor).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="bg-gray-100">
      <div className="mb-10">
        <select
          value={filterByBrand}
          onChange={(e) => setFilterByBrand(e.target.value)}
          className="bg-white w-1/4 py-2 px-3 rounded-md"
        >
          <option disabled value={0}>
            Seçiniz
          </option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          value={filterByColor}
          onChange={(e) => setFilterByColor(e.target.value)}
          className="bg-white w-1/4 py-2 px-3 ml-5 rounded-ml outline-none"
        >
          <option disabled value={0}>
            Seçiniz
          </option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        <button className="ml-10 btn" onClick={() => handleFilter()}>
          Filtrele
        </button>
      </div>

      <div className="grid grid-cols-12 gap-7">
        {products.map((car, index) => (
          <NavLink
            key={index}
            className="bg-white h-80 rounded-md col-span-3 shadow-item"
            to={`/cardetails/${car.productId}`}
          >
            <img
              src={car.imagePath ? apiImagesUrl + car.imagePath : defaultImage}
              className="rounded-t-md h-2/3 object-cover object-center w-full"
              alt=""
            />
            <div className="text-center flex flex-col justify-between h-1/3 py-2">
              <p>{car.brandName + " " + car.modelName}</p>
              <p>{car.colorName}</p>
              <p className="mt-1">{car.dailyPrice}₺</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Products;
