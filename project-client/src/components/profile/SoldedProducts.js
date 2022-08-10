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
      setSoldedProducts(result.data)
    );
  }, []);

  return (
    <div>
      {soldedProducts.map(
        (offer, index) =>
          offer.isSold && (
            <div
              className="py-4 px-10 bg-white rounded w-full mb-3 flex justify-between items-center text-xl"
              key={index}
            >
              <div>Ürün Sahibi = {offer.ownerName}</div>
              <div>Teklif Veren = {offer.userName}</div>
              <div>{offer.productName}</div>
              <div>Ürün Fiyatı = {offer.price}</div>
              <div>Satılan Fiyat = {offer.offeredPrice}</div>
            </div>
          )
      )}
    </div>
  );
}

export default SoldedProducts;
