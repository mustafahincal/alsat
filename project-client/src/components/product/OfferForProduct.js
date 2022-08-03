import React, { useEffect } from "react";
import defaultImage from "../../assets/default.png";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useProductContext } from "../../context/ProductContext";
import { OfferSchema } from "../../validations/offerSchema";

function OfferForProduct() {
  const { selectedProduct } = useProductContext();
  const { selectedUser } = useUserContext();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {},
      onSubmit: (values) => {
        // OfferForProduct(values)
        //   .then((response) => {
        //     if (response.success) {
        //       toast.success("Teklif verme işlemi başarılı");
        //     }
        //   })
        //   .catch((err) =>
        //     err.Errors.map((error) => toast.error(error.ErrorMessage))
        //   );
        console.log(values);
      },
      validationSchema: OfferSchema,
    });

  const apiImagesUrl = "https://localhost:44322/uploads/images/";
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
            <div className="bg-darkBlue w-1/2 px-5 py-5  text-gray-100">
              <div className="flex flex-col justify-between h-full">
                <div>{selectedProduct.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 text-right">
          <h1 className="font-extrabold text-3xl text-black mb-5">Teklif</h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-7">
              {/* <div className="flex justify-between items-center">
                <label htmlFor="rentDate" className="text-left">
                  Kiralama Tarihi
                </label>
                <input
                  value={values.rentDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="rentDate"
                  type="date"
                  id="rentDate"
                  className="text-darkBlue py-2 px-4 w-3/5"
                />
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfferForProduct;
