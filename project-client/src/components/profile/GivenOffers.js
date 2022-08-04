import React, { useEffect } from "react";
import { getOfferDetailsByUserId } from "../../services/offerService";
import { useOfferContext } from "../../context/UseOfferContext";
import { useUserContext } from "../../context/UserContext";

function GivenOffers() {
  const { offers, setOffers } = useOfferContext();
  const { selectedUser } = useUserContext();
  useEffect(() => {
    getOfferDetailsByUserId(selectedUser.id).then((result) =>
      setOffers(result.data)
    );
  }, []);

  const handleApproveOffer = () => {};
  const handleRefuseOffer = () => {};

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
            {offer.isApproved && (
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
                className="btn bg-red-500 cursor-pointer"
              >
                Teklifi Reddet
              </div>
            )}

            {offer.isApproved && (
              <div className="btn bg-indigo-500">Satıldı</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GivenOffers;
