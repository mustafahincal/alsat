import React, { useEffect, useState } from "react";
import {
  getProducts,
  getProductsByBrand,
  getProductsByBrandAndByColor,
  getProductsByCategory,
  getProductsByColor,
} from "../../services/productService";
import { NavLink, useParams } from "react-router-dom";
import defaultImage from "../../assets/default.png";
import { useProductContext } from "../../context/ProductContext";

function Products() {
  const { products, setProducts } = useProductContext();
  const { brandId, colorId, categoryId } = useParams();

  const apiImagesUrl = "https://localhost:44322/uploads/images/";

  useEffect(() => {
    if (brandId) {
      getProductsByBrand(brandId).then((result) => setProducts(result.data));
    } else if (colorId) {
      getProductsByColor(colorId).then((result) => setProducts(result.data));
    } else if (categoryId) {
      getProductsByCategory(categoryId).then((result) =>
        setProducts(result.data)
      );
    } else {
      getProducts().then((result) => setProducts(result.data));
    }
  }, [brandId, colorId, categoryId]);

  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-12 gap-10">
        {products.map((product, index) => (
          <NavLink
            key={index}
            className="bg-white rounded-md col-span-3 shadow-item mb-10"
            to={`/productdetails/${product.productId}`}
          >
            <img
              src={
                product.imagePath
                  ? apiImagesUrl + product.imagePath
                  : defaultImage
              }
              className="rounded-t-md h-2/3 object-cover object-center w-full"
              alt=""
            />
            <div className="text-center flex flex-col justify-between py-2 px-5">
              <div className="flex justify-between">
                <p>Ürün</p>
                <p>{product.productName}</p>
              </div>
              <div className="flex justify-between">
                <p>Kategori</p>
                <p>{product.categoryName}</p>
              </div>
              <div className="flex justify-between">
                <p>Marka</p>
                <p>{product.brandName}</p>
              </div>
              <div className="flex justify-between">
                <p>Renk</p>
                <p>{product.colorName}</p>
              </div>
              <div className="flex justify-between">
                <p>Fiyat</p>
                <p>{product.price}₺</p>
              </div>
            </div>

            <div>
              {product.isOfferable ? (
                <div className="py-0.5 bg-teal-500 rounded-b text-white text-center text-sm">
                  Teklif Verilebilir
                </div>
              ) : (
                <div className="py-0.5 bg-indigo-500 rounded-b text-white text-center text-sm">
                  Teklif Verilemez
                </div>
              )}

              {product.isSold ? (
                <div className="py-0.5 bg-rose-500 rounded-b text-white text-center text-sm ">
                  Satıldı
                </div>
              ) : (
                <div className="py-0.5 bg-lime-500 rounded-b text-white text-center text-sm">
                  Satılmadı
                </div>
              )}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Products;
