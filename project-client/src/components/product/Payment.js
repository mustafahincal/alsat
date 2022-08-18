import React, { useEffect } from "react";
import { useFormik } from "formik";
import { PaymentSchema } from "../../validations/paymentSchema";
import { useParams } from "react-router-dom";
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
import { saveCreditCard } from "../../services/creditCardService";
import { useUserContext } from "../../context/UserContext";
import { getUserById } from "../../services/userService";
import { getFromLocalStorage } from "../../services/localStorageService";

function Payment() {
  const { productId, offerId } = useParams();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { selectedOffer, setSelectedOffer } = useOfferContext();
  const { selectedUser, setSelectedUser } = useUserContext();

  useEffect(() => {
    getUserById(getFromLocalStorage("userId")).then((result) =>
      setSelectedUser(result.data[0])
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
        userId: selectedUser.userId,
        name: "",
        surname: "",
        cardNumber: "",
        expirationDate: "",
        cvvCode: "",
      },
      onSubmit: (values) => {
        let isSaved = window.confirm(
          "Kredi Kartı sonraki alışverişleriniz için kaydedilsin mi?"
        );
        if (isSaved) {
          //saveCreditCard(values).then((result) => console.log(result));
          console.log(values);
        }
        //handleBuyProduct();
      },
      validationSchema: PaymentSchema,
    });

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
          <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-10">
            <div className="flex justify-between items-center">
              <div>
                <input
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  type="text"
                  className="text-darkBlue py-2 px-4"
                  placeholder="Ad"
                />
                {errors.name && touched.name && (
                  <div className="text-red-400 my-2  text-sm">
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <input
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="surname"
                  type="text"
                  className="text-darkBlue py-2 px-4"
                  placeholder="Soyad"
                />
                {errors.surname && touched.surname && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.surname}
                  </div>
                )}
              </div>
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
            <div className="flex justify-between items-center mt-5">
              <div>
                <input
                  value={values.expirationDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="expirationDate"
                  type="text"
                  className="text-darkBlue py-2 px-4 "
                  placeholder="Son Kullanım Tarihi"
                />
                {errors.expirationDate && touched.expirationDate && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.expirationDate}
                  </div>
                )}
              </div>
              <div>
                <input
                  value={values.cvvCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="cvvCode"
                  type="text"
                  className="text-darkBlue py-2 px-4 "
                  placeholder="CVV/CVC"
                />
                {errors.cvvCode && touched.cvvCode && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.cvvCode}
                  </div>
                )}
              </div>
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
