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
import defaultImage from "../../assets/default.png";

function GivenOffers() {
  const { givenOffers, setGivenOffers } = useOfferContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  const { selectedUser } = useUserContext();
  useEffect(() => {
    getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
      setGivenOffers(result.data)
    );
  }, []);

  const handleCancelOffer = (offerId) => {
    deleteOffer(offerId).then((response) => {
      toast.success(response.message);
      getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
        setGivenOffers(result.data)
      );
    });
  };

  return (
    <div>
      {givenOffers.length !== 0 ? (
        <div>
          {givenOffers.map((offer, index) => (
            <div
              className="h-52 flex hover:border-gray-400 border-2 border-gray-100 mb-5 shadow-item2"
              key={index}
            >
              <div className="w-1/3 h-full">
                <img
                  src={
                    offer.imagePath
                      ? apiImagesUrl + offer.imagePath
                      : defaultImage
                  }
                  className="rounded-tl-md rounded-bl-md object-cover object-center w-full -ml-[1px] h-full"
                  alt=""
                />
              </div>
              <div className="py-4 px-10 rounded w-full flex flex-col text-xl transition-all duration-75  bg-white  h-full justify-between">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center  gap-1">
                    <div>
                      <div>Ürün Sahibi</div>
                    </div>
                    <div>{offer.ownerName}</div>
                  </div>
                  <div className="flex flex-col items-center  gap-1">
                    <div>
                      <div>Teklif Veren</div>
                    </div>
                    <div>{offer.userName}</div>
                  </div>
                  <div className="flex flex-col items-center  gap-1">
                    <div>
                      <div>Ürün Adı</div>
                    </div>
                    <div>{offer.productName}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div>
                      <div>Ürün Fiyatı</div>
                    </div>
                    <div>{offer.price}</div>
                  </div>
                  <div className="flex flex-col items-center  gap-1">
                    <div>
                      <div>Verdiğiniz Teklif</div>
                    </div>
                    <div>{offer.offeredPrice}</div>
                  </div>
                </div>
                <div className="flex mt-5 justify-center">
                  {!offer.isApproved && (
                    <NavLink
                      to={`/offerForProduct/${offer.productId}`}
                      className="btn border-2 box-border bg-white border-emerald-600 transition-all text-emerald-500 hover:bg-emerald-500 hover:text-white cursor-pointer"
                    >
                      Teklifi Artır
                    </NavLink>
                  )}

                  {!offer.isApproved && (
                    <div
                      onClick={() => handleCancelOffer(offer.offerId)}
                      className="btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white  ml-3 cursor-pointer"
                    >
                      Teklifi Geri Çek
                    </div>
                  )}

                  {offer.isApproved && !offer.isSold && (
                    <div className="flex">
                      <div className="btn bg-teal-500 mr-2  border-2 border-teal-500">
                        Teklif Kabul Edildi
                      </div>
                      <NavLink
                        to={`/payment/offer/${offer.offerId}`}
                        className="btn border-2 box-border bg-white border-sky-500 transition-all text-sky-500 hover:bg-sky-500 hover:text-white ml-3 cursor-pointer"
                      >
                        Ödeme Yap
                      </NavLink>
                    </div>
                  )}

                  {offer.isApproved && offer.isSold && (
                    <div className="btn bg-sky-500 ml-3 border-2 border-sky-500">
                      Ürün Satın Alındı
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-5 bg-indigo-200 rounded-lg text-2xl text-black  text-center">
          Verdiğiniz teklif yoktur
        </div>
      )}
    </div>
  );
}

export default GivenOffers;
