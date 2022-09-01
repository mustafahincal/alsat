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
import { useSubmitContext } from "../../context/SubmitContext";

function GivenOffers() {
  const { givenOffers, setGivenOffers } = useOfferContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  const { selectedUser } = useUserContext();
  useEffect(() => {
    setIsSubmitting(false);
    getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) =>
      setGivenOffers(result.data)
    );
  }, []);

  const handleCancelOffer = (offerId) => {
    setIsSubmitting(true);
    deleteOffer(offerId).then((response) => {
      toast.success("Teklif geri çekildi");
      setIsSubmitting(false);
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
              className="md:h-52 flex hover:border-gray-800 rounded-md border-2 border-gray-100 dark:border-gray-700 dark:hover:border-gray-200 mb-5 shadow-item2"
              key={index}
            >
              <div className="w-1/3 h-full hidden md:block">
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
              <div className="py-4 px-3 lg:px-7 xl:px-10 rounded w-full flex flex-col text-xl transition-all duration-75 dark:bg-gray-800  bg-white  h-full justify-between">
                <div className="flex flex-col sm:flex-row sm:justify-between text-md sm:text-lg">
                  <div className="flex px-10 flex-row justify-between sm:flex-col sm:px-0 items-center  gap-1 ">
                    <div>Ürün Sahibi</div>

                    <div>{offer.ownerName}</div>
                  </div>
                  <div className="flex px-10 flex-row justify-between sm:flex-col sm:px-0 items-center  gap-1 ">
                    <div>Teklif Veren</div>

                    <div>{offer.userName}</div>
                  </div>
                  <div className="flex px-10 flex-row justify-between sm:flex-col sm:px-0 items-center  gap-1 ">
                    <div>Ürün Adı</div>

                    <div>{offer.productName}</div>
                  </div>
                  <div className="flex px-10 flex-row justify-between sm:flex-col sm:px-0 items-center  gap-1 ">
                    <div>Ürün Fiyatı</div>

                    <div>{offer.price}</div>
                  </div>
                  <div className="flex px-10 flex-row justify-between sm:flex-col sm:px-0 items-center  gap-1">
                    <div>Verdiğiniz Teklif</div>

                    <div>{offer.offeredPrice}</div>
                  </div>
                </div>
                <div className="flex mt-5 justify-center text-sm sm:text-lg">
                  {!offer.isApproved && (
                    <NavLink
                      to={
                        isSubmitting
                          ? ""
                          : `/offerForProduct/${offer.productId}`
                      }
                      className="btn border-2 box-border bg-white border-emerald-600 transition-all text-emerald-500 hover:bg-emerald-500 hover:text-white cursor-pointer"
                    >
                      Teklifi Artır
                    </NavLink>
                  )}

                  {!offer.isApproved && (
                    <button
                      onClick={() => handleCancelOffer(offer.offerId)}
                      className={`btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white  ml-3 cursor-pointer ${
                        isSubmitting ? "submitting" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      Teklifi Geri Çek
                    </button>
                  )}

                  {offer.isApproved && !offer.isSold && (
                    <div className="flex">
                      <div className="btn bg-teal-500 mr-2  border-2 border-teal-500">
                        Teklif Kabul Edildi
                      </div>
                      <NavLink
                        to={
                          isSubmitting ? "" : `/payment/offer/${offer.offerId}`
                        }
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
