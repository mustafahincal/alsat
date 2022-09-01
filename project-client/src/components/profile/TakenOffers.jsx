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
import { getProduct, updateProduct } from "../../services/productService";
import { useProductContext } from "../../context/ProductContext";
import defaultImage from "../../assets/default.png";
import { useSubmitContext } from "../../context/SubmitContext";

function TakenOffers() {
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  const { takenOffers, setTakenOffers } = useOfferContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  const { seledtedProduct, setSelectedProduct } = useProductContext();
  useEffect(() => {
    setIsSubmitting(false);
    getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
      setTakenOffers(result.data)
    );
  }, []);

  const handleRefuseOffer = (offerId) => {
    setIsSubmitting(true);
    deleteOffer(offerId).then((response) => {
      toast.success(response.message);
      setIsSubmitting(false);
      getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
        setTakenOffers(result.data)
      );
    });
  };

  const handleApproveOffer = (offerId, productId, offeredPrice, userId) => {
    setIsSubmitting(true);
    const data = {
      offerId,
      productId,
      offeredPrice,
      userId,
      isApproved: true,
    };
    updateOffer(data).then((response) => {
      toast.success(response.message);
      setIsSubmitting(false);
      getOfferDetailsByOwnerId(getFromLocalStorage("userId")).then((result) =>
        setTakenOffers(result.data)
      );
    });
  };

  return (
    <div>
      {takenOffers.length !== 0 ? (
        <div>
          {takenOffers.map((offer, index) => (
            <div
              className="md:h-52 flex hover:border-gray-700 border-2 rounded-md dark:border-gray-800 dark:hover:border-gray-200  border-gray-100 mb-5 shadow-item2"
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
                  <div className="flex px-10 flex-row justify-between sm:flex-col sm:px-0 items-center  gap-1 ">
                    <div>Verdiğiniz Teklif</div>

                    <div>{offer.offeredPrice}</div>
                  </div>
                </div>
                <div className="flex mt-5 justify-center">
                  {!offer.isApproved && (
                    <button
                      onClick={() =>
                        handleApproveOffer(
                          offer.offerId,
                          offer.productId,
                          offer.offeredPrice,
                          offer.userId
                        )
                      }
                      className={`btn border-2 box-border bg-white border-emerald-600 transition-all text-emerald-500 hover:bg-emerald-500 hover:text-white cursor-pointer ${
                        isSubmitting ? "submitting" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      Teklifi Onayla
                    </button>
                  )}

                  {!offer.isApproved && (
                    <button
                      onClick={() => handleRefuseOffer(offer.offerId)}
                      className={`ml-5 btn border-2 box-border bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white cursor-pointer ${
                        isSubmitting ? "submitting" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      Teklifi Reddet
                    </button>
                  )}

                  {offer.isApproved && !offer.isSold && (
                    <div className="btn bg-indigo-500 ml-3 border-2 border-indigo-500">
                      Teklif Kabul Edildi, Ödeme Bekleniyor
                    </div>
                  )}

                  {offer.isApproved && offer.isSold && (
                    <div className="btn bg-amber-500 ml-3 border-2 border-amber-500">
                      Ödeme Yapıldı, Ürün Satıldı
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-5 bg-indigo-200 rounded-lg text-2xl text-black  text-center">
          Aldığınız teklif yoktur
        </div>
      )}
    </div>
  );
}

export default TakenOffers;
