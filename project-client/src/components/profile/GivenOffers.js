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

function GivenOffers() {
  const { givenOffers, setGivenOffers } = useOfferContext();
  const { selectedUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
      setGivenOffers(result.data)
    );
  }, []);

  const handleCancelOffer = (offerId) => {
    const data = {
      offerId,
    };
    deleteOffer(data).then((response) => {
      toast.success(response.message);
      getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
        setGivenOffers(result.data)
      );
    });
  };

  const handleBuyProduct = () => {};

  return (
    <div>
      {givenOffers.map((offer, index) => (
        <div
          className="py-4 px-10 bg-white rounded w-full mb-3 flex justify-between items-center text-xl"
          key={index}
        >
          <div>Ürün Sahibi = {offer.ownerName}</div>
          <div>Teklif Veren = {offer.userName}</div>
          <div>{offer.productName}</div>
          <div>Ürün Fiyatı = {offer.price}</div>
          <div>Verdiğiniz Teklif = {offer.offeredPrice}</div>
          <div className="flex">
            {!offer.isApproved && (
              <NavLink
                to={`/offerForProduct/${offer.productId}`}
                className="btn bg-emerald-500 cursor-pointer"
              >
                Teklifi Artır
              </NavLink>
            )}

            {!offer.isApproved && (
              <div
                onClick={() => handleCancelOffer(offer.offerId)}
                className="btn bg-red-500 ml-3 cursor-pointer"
              >
                Teklifi Geri Çek
              </div>
            )}

            {offer.isApproved && (
              <div
                onClick={() => handleBuyProduct()}
                className="btn bg-sky-500 ml-3 cursor-pointer"
              >
                Satın Al
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GivenOffers;
