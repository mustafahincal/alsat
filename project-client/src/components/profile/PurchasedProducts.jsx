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
              className="cursor-pointer shadow-item2 rounded-tl-md rounded-tr-md bg-white dark:bg-gray-800 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4"
            >
              <div>
                <img
                  src={
                    product.imagePath
                      ? apiImagesUrl + product.imagePath
                      : defaultImage
                  }
                  className="rounded-tl-md rounded-tr-md object-cover object-center w-full  h-96"
                  alt=""
                />
              </div>
              <div className="p-6 items-center rounded-b-md gap-2 w-full mb-3 flex flex-col justify-between dark:bg-gray-800 dark:text-white  text-xl bg-white ">
                <div className="flex justify-between w-full">
                  <div>Ürünü Satan</div>
                  <div>{product.ownerName}</div>
                </div>
                <div className="flex justify-between w-full">
                  <div>Ürün Adı</div>
                  <div>{product.productName}</div>
                </div>
                <div className="flex justify-between w-full">
                  <div>Ürün Fiyatı</div>
                  <div>{product.price}</div>
                </div>
                <div className="flex justify-between w-full">
                  <div>Satılan Fiyat</div>
                  <div>{product.offeredPrice}</div>
                </div>
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
