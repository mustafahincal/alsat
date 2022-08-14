import React, { useEffect } from "react";
import {
  deleteOffer,
  getOfferDetailsByOwnerId,
  getOfferDetailsByUserId,
} from "../../services/offerService";
import { useOfferContext } from "../../context/OfferContext";
import { useUserContext } from "../../context/UserContext";
import { getFromLocalStorage } from "../../services/localStorageService";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { deleteProduct } from "../../services/productService";
import { useProductContext } from "../../context/ProductContext";

function SoldedProducts() {
  const { soldedProducts, setSoldedProducts } = useProductContext();

  useEffect(() => {
    getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
      setSoldedProducts(result.data.filter((offer) => offer.isSold === true))
    );
  }, []);

  return (
    <div>
      {soldedProducts.length !== 0 ? (
        <div className="grid grid-cols-12 gap-7">
          {soldedProducts.map((product, index) => (
            <div
              className="p-6 items-center rounded gap-2 w-full mb-3 flex flex-col justify-between  text-xl transition-all duration-75  bg-white hover:border-gray-400 border-2 border-gray-100 col-span-4"
              key={index}
            >
              <div>Ürünü Satın Alan = {product.userName}</div>
              <div>Ürün Adı = {product.productName}</div>
              <div>Ürün Fiyatı = {product.price}</div>
              <div>Satılan Fiyat = {product.offeredPrice}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-5 bg-indigo-200 rounded-lg text-2xl text-black  text-center">
          Sattığınız ürün yoktur
        </div>
      )}
    </div>
  );
}

export default SoldedProducts;
