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
import defaultImage from "../../assets/default.png";

function PurchasedProducts() {
  const { purchasedProducts, setPurchasedProducts } = useProductContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  useEffect(() => {
    getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
      setPurchasedProducts(result.data.filter((offer) => offer.isSold === true))
    );
  }, []);

  return (
    <div>
      {purchasedProducts.length !== 0 ? (
        <div className="grid grid-cols-12 gap-7">
          {purchasedProducts.map((product, index) => (
            <div
              key={index}
              className="shadow-item2  rounded-tl-md rounded-tr-md cursor-pointer bg-white dark:bg-gray-800 border-gray-100 col-span-4"
            >
              <div>
                <img
                  src={
                    product.imagePath
                      ? apiImagesUrl + product.imagePath
                      : defaultImage
                  }
                  className="rounded-tl-md rounded-tr-md object-cover object-center w-full  h-full"
                  alt=""
                />
              </div>
              <div className="p-7 rounded-b-md items-center gap-2 w-full mb-3 flex flex-col justify-between text-xl dark:bg-gray-800 dark:text-white bg-white">
                <div>Ürünü Satan = {product.userName}</div>
                <div>Ürün Adı = {product.productName}</div>
                <div>Ürün Fiyatı = {product.price}</div>
                <div>Satın Alınan Fiyat = {product.offeredPrice}</div>
              </div>
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
