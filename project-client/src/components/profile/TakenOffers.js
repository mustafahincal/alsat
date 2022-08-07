import React, { useEffect } from "react";
import {
  deleteOffer,
  getOfferDetailsByOwnerId,
  getOfferDetailsByUserId,
  updateOffer,
} from "../../services/offerService";
import { useOfferContext } from "../../context/OfferContext";
import { useUserContext } from "../../context/UserContext";
import { getFromLocalStorage } from "../../services/localStorageService";
import { toast } from "react-toastify";

function TakenOffers() {
  const { takenOffers, setTakenOffers } = useOfferContext();
  useEffect(() => {
    getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
      setTakenOffers(result.data)
    );
  }, []);

  const handleRefuseOffer = (offerId) => {
    const data = {
      offerId,
    };
    deleteOffer(data).then((response) => {
      toast.success(response.message);
      getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
        setTakenOffers(result.data)
      );
    });
  };

  const handleApproveOffer = (offerId, productId, offeredPrice, userId) => {
    const data = {
      offerId,
      productId,
      offeredPrice,
      userId,
      isApproved: true,
    };
    updateOffer(data).then((response) => {
      toast.success(response.message);
      getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
        setTakenOffers(result.data)
      );
    });
  };

  return (
    <div>
      {takenOffers.map((offer, index) => (
        <div
          className="py-4 px-10 bg-white rounded w-full mb-3 flex justify-between items-center text-xl"
          key={index}
        >
          <div>Ürün Sahibi = {offer.ownerName}</div>
          <div>Teklif Veren = {offer.userName}</div>
          <div>{offer.productName}</div>
          <div>Ürün Fiyatı = {offer.price}</div>
          <div>Verilen Teklif = {offer.offeredPrice}</div>

          <div className="flex">
            {!offer.isApproved && (
              <div
                onClick={() =>
                  handleApproveOffer(
                    offer.offerId,
                    offer.productId,
                    offer.offeredPrice,
                    offer.userId
                  )
                }
                className="btn bg-emerald-500 cursor-pointer"
              >
                Teklifi Onayla
              </div>
            )}

            {!offer.isApproved && (
              <div
                onClick={() => handleRefuseOffer()}
                className="btn bg-red-500 cursor-pointer ml-3"
              >
                Teklifi Reddet
              </div>
            )}

            {offer.isApproved && (
              <div className="btn bg-indigo-500 ml-3">
                Satıldı, Ödeme Bekleniyor
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TakenOffers;
