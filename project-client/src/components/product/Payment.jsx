import React, { useEffect } from "react";
import { useFormik } from "formik";
import { PaymentSchema } from "../../validations/paymentSchema";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteOffer,
  getOfferDetailsById,
  getOfferDetailsByUserId,
} from "../../services/offerService";
import { useOfferContext } from "../../context/OfferContext";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../services/productService";
import { useProductContext } from "../../context/ProductContext";
import {
  getCreditCardById,
  saveCreditCard,
  updateCreditCard,
} from "../../services/creditCardService";
import { useUserContext } from "../../context/UserContext";
import { getUserById } from "../../services/userService";
import { getFromLocalStorage } from "../../services/localStorageService";
import { usePaymentContext } from "../../context/PaymentContext";
import { useSubmitContext } from "../../context/SubmitContext";

function Payment() {
  const { productId, offerId } = useParams();
  const { selectedProduct, setSelectedProduct, products, setProducts } =
    useProductContext();
  const { selectedOffer, setSelectedOffer } = useOfferContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  const {
    saveCardModalActive,
    setSaveCardModalActive,
    selectedCreditCard,
    setSelectedCreditCard,
  } = usePaymentContext();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSubmitting(false);
    getCreditCardById(getFromLocalStorage("userId")).then((result) =>
      setSelectedCreditCard(result.data)
    );
    if (productId) {
      getProduct(productId).then((result) =>
        setSelectedProduct(result.data[0])
      );
    } else if (offerId) {
      getOfferDetailsById(offerId).then((result) => {
        setSelectedOffer(result.data[0]);
        getProduct(result.data[0].productId).then((result) =>
          setSelectedProduct(result.data[0])
        );
      });
    }
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        userId: getFromLocalStorage("userId"),
        cardHolder: "",
        cardNumber: "",
        expirationDate: "",
        cvvCode: "",
      },
      onSubmit: async (values) => {
        if (
          values.cardNumber ===
            (selectedCreditCard ? selectedCreditCard.cardNumber : "") &&
          values.cardHolder ===
            (selectedCreditCard ? selectedCreditCard.cardHolder : "") &&
          values.expirationDate ===
            (selectedCreditCard ? selectedCreditCard.expirationDate : "") &&
          values.cvvCode ===
            (selectedCreditCard ? selectedCreditCard.cvvCode : "")
        ) {
          console.log("true");
          handleBuyProduct();
        } else {
          setSaveCardModalActive(true);
          console.log("false");
        }
      },
      validationSchema: PaymentSchema,
    });

  const handleSaveCreditCardModal = (controlSave) => {
    setSaveCardModalActive(false);
    if (controlSave && selectedCreditCard) {
      const data = {
        ...values,
        creditCardId: selectedCreditCard.creditCardId,
      };
      updateCreditCard(data).then((result) => {
        handleBuyProduct();
      });
    } else if (controlSave) {
      saveCreditCard(values).then((result) => {
        handleBuyProduct();
      });
    } else if (!controlSave) {
      handleBuyProduct();
    }
  };

  const usePreviousCard = () => {
    values.cardHolder = selectedCreditCard.cardHolder;
    values.cardNumber = selectedCreditCard.cardNumber;
    values.expirationDate = selectedCreditCard.expirationDate;
    values.cvvCode = selectedCreditCard.cvvCode;

    getCreditCardById(getFromLocalStorage("userId")).then((result) =>
      setSelectedCreditCard(result.data)
    );
  };

  const handleBuyProduct = () => {
    setIsSubmitting(true);
    const data = {
      productId: selectedProduct.productId,
      name: selectedProduct.productName,
      categoryId: selectedProduct.categoryId,
      brandId:
        selectedProduct.brandId === "0" ||
        selectedProduct.brandId === 0 ||
        selectedProduct.brandId === ""
          ? null
          : selectedProduct.brandId,
      colorId:
        selectedProduct.colorId === "0" ||
        selectedProduct.colorId === 0 ||
        selectedProduct.colorId === ""
          ? null
          : selectedProduct.colorId,
      price: selectedProduct.price,
      description: selectedProduct.description,
      usingStateId: selectedProduct.usingStateId,
      ownerId: selectedProduct.ownerId,
      isSold: true,
      isOfferable: false,
      offerId: selectedOffer.offerId,
      userId: Number(getFromLocalStorage("userId")),
    };
    updateProduct(data)
      .then((response) => {
        setIsSubmitting(false);
        getProducts().then((result) => {
          setProducts(result.data);
          toast.success("Satın Alma İşlemi Başarılı");
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my-20 px-6 lg:px-0">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5 m-auto py-12  px-16 shadow-item mt-20 bg-white dark:bg-gray-800 dark:text-white">
        <form onSubmit={handleSubmit}>
          <div className="w-full m-auto">
            <h1 className="font-extrabold text-3xl  mb-5 text-center">
              Ödeme Bilgileri
            </h1>
            {selectedCreditCard && (
              <div
                onClick={usePreviousCard}
                className="px-3 py-4 bg-red-500 bg-opacity-60 text-xl text-white  text-center mb-5 cursor-pointer block w-full"
              >
                Kayıtlı Kartınızı kullanmak isterseniz tıklayınız
              </div>
            )}
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-10">
              <div className="w-full">
                <input
                  value={values.cardHolder}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="cardHolder"
                  type="text"
                  className="text-darkBlue py-2 px-4 w-full"
                  placeholder="Kart üzerindeki isim"
                />
                {errors.cardHolder && touched.cardHolder && (
                  <div className="text-red-400 my-2  text-sm">
                    {errors.cardHolder}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  value={values.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="cardNumber"
                  type="text"
                  className="text-darkBlue py-2 px-4 w-full"
                  placeholder="Kart Numarası"
                />
                {errors.cardNumber && touched.cardNumber && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.cardNumber}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  value={values.expirationDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="expirationDate"
                  type="text"
                  className="text-darkBlue py-2 px-4 w-1/2"
                  placeholder="aa/yy"
                />
                {errors.expirationDate && touched.expirationDate && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.expirationDate}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  value={values.cvvCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="cvvCode"
                  type="text"
                  className="text-darkBlue py-2 px-4 w-1/2"
                  placeholder="CVV/CVC"
                />
                {errors.cvvCode && touched.cvvCode && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.cvvCode}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 flex justify-between">
              {offerId ? (
                <div className="bg-darkBlue px-4 py-2 text-white rounded text-lg">
                  {selectedOffer.offeredPrice}₺
                </div>
              ) : (
                <div className="bg-darkBlue px-4 py-2 text-white rounded text-lg">
                  {selectedProduct.price}₺
                </div>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className={`btn text-lg ${isSubmitting ? "submitting" : ""}`}
              >
                Ödemeyi Tamamla
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={`modal ${saveCardModalActive && "activeModal"}`}>
        <div className="dark:bg-darkBlue dark:text-white bg-white text-black w-1/3 py-10 px-16">
          <div className="flex justify-between mb-3 items-center">
            <h1 className="text-2xl ">
              Kredi Kartı sonraki alışverişleriniz için kaydedilsin mi?
            </h1>
            <button onClick={() => setSaveCardModalActive(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="flex">
            <div
              onClick={() => handleSaveCreditCardModal(true)}
              className="btn bg-crimson text-white mt-4 self-end cursor-pointer"
            >
              Kaydet
            </div>
            <div
              onClick={() => handleSaveCreditCardModal(false)}
              className="btn bg-crimson text-white mt-4 ml-4 self-end cursor-pointer"
            >
              Kaydetme
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
