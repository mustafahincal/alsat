import React, { useEffect } from "react";
import { getOfferDetailsByUserId } from "../../services/offerService";
import { useOfferContext } from "../../context/UseOfferContext";
import { useUserContext } from "../../context/UserContext";

function ProfileOffers() {
  const { offers, setOffers } = useOfferContext();
  const { selectedUser } = useUserContext();
  useEffect(() => {
    getOfferDetailsByUserId(selectedUser.id).then((result) =>
      setOffers(result.data)
    );
  }, []);
  return (
    <div>
      {offers.map((offer, index) => (
        <div
          className="py-4 px-10 bg-white hover:bg-gray-100 rounded w-full mb-3 flex justify-between items-center text-xl"
          key={index}
        >
          <div>{offers.name}</div>
        </div>
      ))}
    </div>
  );
}

export default ProfileOffers;
