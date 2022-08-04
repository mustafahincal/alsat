import React, { useEffect } from "react";
import { getOfferDetailsByUserId } from "../../services/offerService";
import { useOfferContext } from "../../context/UseOfferContext";
import { useUserContext } from "../../context/UserContext";

function TakenOffers() {
  const { offers, setOffers } = useOfferContext();
  const { selectedUser } = useUserContext();
  useEffect(() => {
    getOfferDetailsByUserId(selectedUser.id).then((result) =>
      setOffers(result.data)
    );
  }, []);

  const handleCancelOffer = () => {};
  const handleIncreaseOffer = () => {};
  const handleBuyProduct = () => {};

  return (
    <div>
      {offers.map((offer, index) => (
        <div
          className="py-4 px-10 bg-white hover:bg-gray-100 rounded w-full mb-3 flex justify-between items-center text-xl"
          key={index}
        >
          <div>{offer.ownerName}</div>
          <div>{offer.userName}</div>
          <div>{offer.productName}</div>
          <div>{offer.offeredPrice}</div>
          <div>
            {!offer.isApproved && (
              <div
                onClick={() => handleIncreaseOffer()}
                className="btn bg-emerald-500"
              >
                Teklifi Artır
              </div>
            )}

            {!offer.isApproved && (
              <div
                onClick={() => handleCancelOffer()}
                className="btn bg-red-500"
              >
                Teklifi Geri Çek
              </div>
            )}

            {offer.isApproved && (
              <div
                onClick={() => handleBuyProduct()}
                className="btn bg-sky-500"
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

export default TakenOffers;
