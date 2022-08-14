import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductContext } from "../../../context/ProductContext";
import { deleteProductImage } from "../../../services/productImageService";
import {
  deleteProduct,
  getProduct,
  getProducts,
} from "../../../services/productService";

function ControlProducts() {
  const { products, setProducts } = useProductContext();

  useEffect(() => {
    getProducts().then((result) => setProducts(result.data));
  }, []);

  const handleDeleteProduct = async (id) => {
    const result = await getProduct(id);
    const selectedProduct = result.data[0];

    const data = {
      productId: selectedProduct.productId,
      name: selectedProduct.productName,
    };
    const imageData = {
      productImageId: selectedProduct.productImageId,
      productId: selectedProduct.productId,
      imagePath: selectedProduct.imagePath,
    };

    deleteProductImage(imageData)
      .then((result) => {
        if (result.success) {
          deleteProduct(data)
            .then((response) => {
              toast.success(response.message);
              getProducts().then((result) => setProducts(result.data));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {products.map((product, index) => (
        <div
          className="py-4 px-6 bg-white hover:border-gray-400 border-2 transition-all duration-75 border-gray-100 rounded w-full mb-3 flex justify-between items-center"
          key={index}
        >
          <div>Ürün Id : {product.productId}</div>
          <div>Ürün Adı : {product.productName}</div>
          <div>Marka : {product.brandName}</div>
          <div>Kategori : {product.categoryName}</div>
          <div>Fiyat : {product.price}</div>
          <div>
            {product.isOfferable ? "Teklif verilebilir" : "Teklif verilemez"}
          </div>
          <div>{product.isSold ? "Satıldı" : "Satılmadı"}</div>
          <div>
            <NavLink
              to={`/productDetails/${product.productId}`}
              className="btn border-2 box-border bg-white border-teal-600 transition-all text-teal-500 hover:bg-teal-500 hover:text-white"
            >
              Ürün Detayları
            </NavLink>
            <NavLink
              to={`/updateProduct/${product.productId}`}
              className="btn border-2 box-border bg-white border-indigo-600 transition-all text-indigo-500 hover:bg-indigo-500 hover:text-white  mx-3"
            >
              Güncelle
            </NavLink>
            <button
              onClick={() => handleDeleteProduct(product.productId)}
              className="btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white"
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ControlProducts;
