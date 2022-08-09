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

function OfferForProduct() {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { selectedUser } = useUserContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedOffer, setSelectedOffer } = useOfferContext();

  useEffect(() => {
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
        productId: getFromLocalStorage("productId"),
        userId: getFromLocalStorage("userId"),
        offeredPrice: "",
        isApproved: false,
      },
      onSubmit: (values) => {
        if (
          selectedOffer &&
          selectedOffer.offeredPrice >= values.offeredPrice
        ) {
          toast.error(
            "Ürüne daha önce verdiğiniz tekliften daha düşük veya aynı teklif veremezsiniz"
          );
          values.offeredPrice = "";
        } else if (selectedOffer) {
          const data = {
            offerId: selectedOffer.offerId,
            productId: selectedOffer.productId,
            offeredPrice: values.offeredPrice,
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
                    navigate("/main");
                  }
                );
              }
            })
            .catch((err) => console.log(err));
        } else {
          offerForProduct(values)
            .then((response) => {
              if (response.success) {
                toast.success("Teklif verme işlemi başarılı");
                getOfferDetailsByUserId(getFromLocalStorage("userId")).then(
                  (result) => {
                    const theOffer = result.data.find(
                      (offer) => offer.productId == selectedProduct.productId
                    );
                    setSelectedOffer(theOffer);
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
    <div className="py-20">
      <div className="bg-white shadow-item w-10/12 m-auto px-10 py-10 flex justify-between gap-5">
        <div className="w-1/2 text-left">
          <h1 className="font-extrabold text-3xl text-black mb-5">
            Ürün Bilgileri
          </h1>
          <div className="w-full flex rounded-l-md">
            <div className="w-1/2">
              <img
                src={
                  selectedProduct.imagePath
                    ? apiImagesUrl + selectedProduct.imagePath
                    : defaultImage
                }
                className="object-cover object-center rounded-t-md"
                alt=""
              />
            </div>
            <div className="bg-darkBlue w-1/2 px-5 py-5  text-gray-100 flex flex-col justify-between">
              <div className="w-full flex justify-between  px-5 font-bold">
                <div>İsim</div>
                <div>{selectedProduct.productName}</div>
              </div>
              <div className="w-full flex justify-between px-5 font-bold">
                <div>Marka</div>
                <div>{selectedProduct.brandName}</div>
              </div>
              <div className="w-full flex justify-between  px-5 font-bold">
                <div>Kategori</div>
                <div>{selectedProduct.categoryName}</div>
              </div>
              <div className="w-full flex justify-between  px-5 font-bold">
                <div>Renk</div>
                <div>{selectedProduct.colorName}</div>
              </div>
              <div className="w-full flex justify-between px-5 font-bold">
                <div>Fiyat</div>
                <div>{selectedProduct.price}₺</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 text-right">
          <h1 className="font-extrabold text-3xl text-black mb-5">Teklif</h1>
          {selectedOffer && (
            <div className="px-5 py-5 bg-red-500 bg-opacity-60 text-2xl text-white  text-center mb-5 ">
              Bu ürüne {selectedOffer.offeredPrice}₺ teklif verdiniz.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-7">
              <div className="flex justify-between items-center">
                <label htmlFor="offeredPrice" className="text-left text-xl">
                  Teklifinizi giriniz
                </label>
                <input
                  value={values.offeredPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="offeredPrice"
                  type="number"
                  id="offeredPrice"
                  className="text-darkBlue py-2 px-4 w-3/5 text-xl"
                />
              </div>
              {errors.offeredPrice && touched.offeredPrice && (
                <div className="text-red-400 text-sm mt-5">
                  {errors.offeredPrice}
                </div>
              )}
            </div>
            <div>
              <button type="submit" className="btn text-lg  py-3 mt-2">
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
