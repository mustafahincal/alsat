import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useProductContext } from "../../context/ProductContext";
import { OfferSchema } from "../../validations/offerSchema";
import defaultImage from "../../assets/default.png";
import { getProduct } from "../../services/productService";
import { getFromLocalStorage } from "../../services/localStorageService";
import {
  getOfferDetailsByUserId,
  offerForProduct,
  updateOffer,
} from "../../services/offerService";
import { useOfferContext } from "../../context/OfferContext";
import { useSubmitContext } from "../../context/SubmitContext";

function OfferForProduct() {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { selectedUser } = useUserContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedOffer, setSelectedOffer } = useOfferContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();

  useEffect(() => {
    setIsSubmitting(false);
    getProduct(id).then((result) => {
      setSelectedProduct(result.data[0]);
    });
    getOfferDetailsByUserId(getFromLocalStorage("userId")).then((result) => {
      const theOffer = result.data.find(
        (offer) => offer.productId == selectedProduct.productId
      );
      setSelectedOffer(theOffer);
    });
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        offeredPercent: 0,
      },
      onSubmit: (values) => {
        if (values.offeredPercent == 0) {
          toast.error("Lütfen teklif yüzdesi seçiniz");
        } else if (
          selectedOffer &&
          selectedOffer.offeredPrice >=
            (values.offeredPercent * selectedProduct.price) / 100
        ) {
          toast.error(
            "Ürüne daha önce verdiğiniz tekliften daha düşük veya aynı teklif veremezsiniz"
          );
          values.offeredPercent = 0;
        } else if (selectedOffer) {
          setIsSubmitting(true);
          const data = {
            offerId: selectedOffer.offerId,
            productId: selectedOffer.productId,
            offeredPrice: Math.ceil(
              (values.offeredPercent * selectedProduct.price) / 100
            ),
            isApproved: selectedOffer.isApproved,
            userId: selectedOffer.userId,
          };
          updateOffer(data)
            .then((response) => {
              if (response.success) {
                toast.success("Teklif güncellendi");
                getOfferDetailsByUserId(getFromLocalStorage("userId")).then(
                  (result) => {
                    const theOffer = result.data.find(
                      (offer) => offer.productId == selectedProduct.productId
                    );
                    setSelectedOffer(theOffer);
                    setIsSubmitting(false);
                    navigate("/main");
                  }
                );
              }
            })
            .catch((err) => console.log(err));
        } else {
          setIsSubmitting(true);
          const data = {
            productId: getFromLocalStorage("productId"),
            userId: getFromLocalStorage("userId"),
            offeredPrice: Math.ceil(
              (values.offeredPercent * selectedProduct.price) / 100
            ),
            isApproved: false,
          };
          offerForProduct(data)
            .then((response) => {
              if (response.success) {
                toast.success("Teklif verme işlemi başarılı");
                getOfferDetailsByUserId(getFromLocalStorage("userId")).then(
                  (result) => {
                    const theOffer = result.data.find(
                      (offer) => offer.productId == selectedProduct.productId
                    );
                    setSelectedOffer(theOffer);
                    setIsSubmitting(false);
                    navigate("/main");
                  }
                );
              }
            })
            .catch((err) => console.log(err));
        }
      },
      validationSchema: OfferSchema,
    });

  return (
    <div className="py-20 px-6 lg:px-0">
      <div className="bg-white dark:bg-gray-800 dark:text-white shadow-item w-full sm:w-4/5 md:w-3/4 mx-auto lg:w-11/12 xl:w-10/12 m-auto px-10 py-10 flex flex-col lg:flex-row lg:justify-between gap-20 lg:gap-5">
        <div className="w-full lg:w-1/2 text-left">
          <h1 className="font-extrabold text-3xl mb-5">Ürün Bilgileri</h1>
          <div className="w-full flex rounded-l-md">
            <div className="w-1/2">
              <img
                src={
                  selectedProduct.imagePath
                    ? apiImagesUrl + selectedProduct.imagePath
                    : defaultImage
                }
                className="object-cover object-center rounded-t-md w-full h-full"
                alt=""
              />
            </div>
            <div className="bg-darkBlue w-1/2 px-7 py-10  text-gray-100 flex flex-col justify-between text-xl">
              <div className="w-full flex justify-between  px-5">
                <div>İsim</div>
                <div>{selectedProduct.productName}</div>
              </div>
              {selectedProduct.brandName && (
                <div className="w-full flex justify-between  px-5">
                  <div>Marka</div>
                  <div>{selectedProduct.brandName}</div>
                </div>
              )}
              <div className="w-full flex justify-between  px-5">
                <div>Kategori</div>
                <div>{selectedProduct.categoryName}</div>
              </div>
              {selectedProduct.colorName && (
                <div className="w-full flex justify-between  px-5">
                  <div>Renk</div>
                  <div>{selectedProduct.colorName}</div>
                </div>
              )}
              <div className="w-full flex justify-between px-5">
                <div>Fiyat</div>
                <div>{selectedProduct.price}₺</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 text-right">
          <h1 className="font-extrabold text-3xl  mb-5">Teklif</h1>
          {selectedOffer && (
            <div className="px-5 py-5 bg-red-500 bg-opacity-60 text-2xl text-white  text-center mb-5 ">
              Bu ürüne {selectedOffer.offeredPrice}₺ teklif verdiniz.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-7">
              <div className="flex justify-between items-center">
                <select
                  className="text-darkBlue py-2 px-3 w-full mt-4 gruop"
                  name="offeredPercent"
                  value={values.offeredPercent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={0}>Teklifiniz</option>
                  <option value={10}>%10</option>
                  <option value={20}>%20</option>
                  <option value={30}>%30</option>
                  <option value={40}>%40</option>
                  <option value={50}>%50</option>
                  <option value={60}>%60</option>
                  <option value={70}>%70</option>
                  <option value={80}>%80</option>
                  <option value={90}>%90</option>
                </select>

                {errors.offeredPercent && touched.offeredPercent && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.offeredPercent}
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`btn text-lg  py-3 mt-6 ${
                  isSubmitting ? "submitting" : ""
                }`}
                disabled={isSubmitting}
              >
                Teklif ver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfferForProduct;
