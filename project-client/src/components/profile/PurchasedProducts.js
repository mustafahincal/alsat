import React, { useEffect } from "react";
import {
  deleteOffer,
  getOfferDetailsByUserId,
} from "../../services/offerService";
import { useOfferContext } from "../../context/OfferContext";
import { useUserContext } from "../../context/UserContext";
import { getFromLocalStorage } from "../../services/localStorageService";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { deleteProduct } from "../../services/productService";
import { useProductContext } from "../../context/ProductContext";

function PurchasedProducts() {
  const { purchasedProducts, setPurchasedProducts } = useProductContext();

  useEffect(() => {
    getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
      setPurchasedProducts(result.data.filter((offer) => offer.isSold === true))
    );
  }, []);

  return (
    <div>
      {purchasedProducts.length !== 0 ? (
        <div className="grid grid-cols-10 gap-7">
          {purchasedProducts.map((product, index) => (
            <div
              className="p-7 rounded items-center gap-2 w-full mb-3 flex flex-col justify-between text-xl transition-all duration-75  bg-white hover:border-gray-400 border-2 border-gray-100 col-span-3"
              key={index}
            >
              <div>Ürünü Satan = {product.userName}</div>
              <div>Ürün Adı = {product.productName}</div>
              <div>Ürün Fiyatı = {product.price}</div>
              <div>Satın Alınan Fiyat = {product.offeredPrice}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-5 bg-indigo-200 rounded-lg text-2xl text-black  text-center">
          Satın aldığınız ürün yoktur
        </div>
      )}
    </div>
  );
}

export default PurchasedProducts;
