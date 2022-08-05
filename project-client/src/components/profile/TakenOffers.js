import React, { useEffect } from "react";
import { getOfferDetailsByOwnerId } from "../../services/offerService";
import { useOfferContext } from "../../context/OfferContext";
import { useUserContext } from "../../context/UserContext";
import { getFromLocalStorage } from "../../services/localStorageService";

function TakenOffers() {
  const { takenOffers, setTakenOffers } = useOfferContext();
  useEffect(() => {
    getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
      setTakenOffers(result.data)
    );
  }, []);

  const handleApproveOffer = () => {};
  const handleRefuseOffer = () => {};

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
          <div>{offer.offeredPrice}</div>
          <div className="flex">
            {!offer.isApproved && (
              <div
                onClick={() => handleApproveOffer()}
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
              <div className="btn bg-indigo-500 ml-3">Satıldı</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TakenOffers;
