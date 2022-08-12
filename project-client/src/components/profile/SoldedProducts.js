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
        <div>
          {soldedProducts.map((product, index) => (
            <div
              className="py-4 px-10 bg-white rounded w-full mb-3 flex justify-between items-center text-xl"
              key={index}
            >
              <div>Ürün Sahibi = {product.ownerName}</div>
              <div>Teklif Veren = {product.userName}</div>
              <div>{product.productName}</div>
              <div>Ürün Fiyatı = {product.price}</div>
              <div>Satılan Fiyat = {product.offeredPrice}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-5 bg-indigo-400 rounded-lg text-2xl text-white  text-center">
          Sattığınız ürün yoktur
        </div>
      )}
    </div>
  );
}

export default SoldedProducts;
