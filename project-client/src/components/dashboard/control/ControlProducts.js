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
import defaultImage from "../../../assets/default.png";
import { AiFillDelete } from "react-icons/ai";

function ControlProducts() {
  const { products, setProducts } = useProductContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  useEffect(() => {
    getProducts().then((result) => setProducts(result.data));
  }, []);

  const handleDeleteProduct = async (productId) => {
    const result = await getProduct(productId);
    const selectedProduct = result.data[0];

    if (selectedProduct.productImageId) {
      deleteProductImage(selectedProduct.productImageId)
        .then((result) => {
          if (result.success) {
            deleteProduct(selectedProduct.productId)
              .then((response) => {
                toast.success(response.message);
                getProducts().then((result) => setProducts(result.data));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      deleteProduct(selectedProduct.productId)
        .then((response) => {
          toast.success(response.message);
          getProducts().then((result) => setProducts(result.data));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex flex-wrap">
      {products.map((product, index) => (
        <div
          className=" dark:bg-gray-800 hover:border-gray-300 border-2 rounded-tl-md rounded-bl-md  transition-all duration-75 border-gray-100 rounded w-full sm:w-1/2 md:w-full md:h-52  mb-5 flex flex-col md:flex-row md:justify-between md:items-center shadow-item2 dark:border-gray-600 dark:hover:border-gray-700 "
          key={index}
        >
          <div className="w-full md:w-1/3 h-1/2 md:h-full">
            <img
              src={
                product.imagePath
                  ? apiImagesUrl + product.imagePath
                  : defaultImage
              }
              className="rounded-tl-md rounded-bl-md object-cover object-center w-full -ml-[1px] h-full"
              alt=""
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3 md:h-full justify-between md:self-stretch py-10 sm:py-2 px-5 lg:px-14 text-md flex-1">
            <div className="flex justify-between">
              <div>Ürün Id</div>
              <div>{product.productId}</div>
            </div>
            <div className="flex justify-between">
              <div>Marka</div>
              <div>{product.brandName}</div>
            </div>
            <div className="flex justify-between">
              <div>Kategori</div>
              <div>{product.categoryName}</div>
            </div>
            <div className="flex justify-between">
              <div>Fiyat</div>
              <div>{product.price}</div>
            </div>
            <div className="flex justify-between">
              <div>Ürün Sahibi</div>
              <div>{product.ownerName}</div>
            </div>
            <div className="text-center">
              {product.isOfferable ? "Teklif verilebilir" : "Teklif verilemez"}
            </div>
            <div className="text-center">
              {product.isSold ? "Satıldı" : "Satılmadı"}
            </div>
          </div>
          <div className="flex sm:px-6 py-5 justify-center items-center  lg:px-10 w-full md:w-1/3">
            <NavLink
              to={`/productDetails/${product.productId}`}
              className="btn border-2 box-border bg-white  border-indigo-600 transition-all text-indigo-500 hover:bg-indigo-500 hover:text-white"
            >
              Ürün Detayları
            </NavLink>
            <NavLink
              to={`/updateProduct/${product.productId}`}
              className="btn border-2 box-border bg-white border-teal-600 transition-all text-teal-500 hover:bg-teal-500 hover:text-white  mx-3"
            >
              Güncelle
            </NavLink>
            <button
              onClick={() => handleDeleteProduct(product.productId)}
              className="btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white"
            >
              <AiFillDelete className="text-2xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ControlProducts;
