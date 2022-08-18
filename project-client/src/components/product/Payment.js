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

function Payment() {
  const { productId, offerId } = useParams();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { selectedOffer, setSelectedOffer } = useOfferContext();
  const { selectedCreditCard, setSelectedCreditCard } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
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
      onSubmit: (values) => {
        if (
          values.cardNumber === selectedCreditCard.cardNumber &&
          values.cardHolder === selectedCreditCard.cardHolder &&
          values.expirationDate === selectedCreditCard.expirationDate &&
          values.cvvCode === selectedCreditCard.cvvCode
        ) {
        } else {
          let isSaved = window.confirm(
            "Kredi Kartı sonraki alışverişleriniz için kaydedilsin mi?"
          );
          if (isSaved && selectedCreditCard) {
            const data = {
              ...values,
              creditCardId: selectedCreditCard.creditCardId,
            };
            updateCreditCard(data);
          } else {
            saveCreditCard(values);
          }
        }
        //handleBuyProduct();
        navigate("/main");
      },
      validationSchema: PaymentSchema,
    });

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
    const productData = {
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
    };

    updateProduct(productData)
      .then((response) => {
        toast.success("Satın Alma İşlemi Başarılı");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-2/5 m-auto py-12 px-16 shadow-item mt-20 bg-white">
      <form onSubmit={handleSubmit}>
        <div className="w-full m-auto">
          <h1 className="font-extrabold text-3xl text-black mb-5 text-center">
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
                placeholder="Son Kullanım Tarihi - aa/yy"
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

            <button type="submit" className="btn text-lg">
              Ödemeyi Tamamla
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
