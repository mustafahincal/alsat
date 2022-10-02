import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useBrandContext } from "../../context/BrandContext";
import { useColorContext } from "../../context/ColorContext";
import { getBrands } from "../../services/brandService";
import { getColors } from "../../services/colorService";
import defaultImage from "../../assets/default.png";
import { useFileContext } from "../../context/FileContext";
import {
  addImage,
  deleteImage,
  deleteProductImage,
} from "../../services/productImageService";
import { useProductContext } from "../../context/ProductContext";
import { ProductSchema } from "../../validations/productSchema";
import { getFromLocalStorage } from "../../services/localStorageService";
import { useCategoryContext } from "../../context/CategoryContext";
import { getCategories } from "../../services/categoryService";
import { getProduct } from "../../services/productService";
import { Navigate, useParams } from "react-router-dom";
import { updateProduct } from "../../services/productService";
import { getUsingStates } from "../../services/usingStateService";
import { UseUsingStateContext } from "../../context/UsingStateContext";
import { useSubmitContext } from "../../context/SubmitContext";

function Updateproduct() {
  const { brands, setBrands } = useBrandContext();
  const { colors, setColors } = useColorContext();
  const { categories, setCategories } = useCategoryContext();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { usingStates, setUsingStates } = UseUsingStateContext();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  const { file, setFile } = useFileContext();
  const { id } = useParams();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";

  useEffect(() => {
    setIsSubmitting(false);
    getBrands().then((result) => setBrands(result.data));
    getColors().then((result) => setColors(result.data));
    getCategories().then((result) => setCategories(result.data));
    getUsingStates().then((result) => setUsingStates(result.data));
    getProduct(id).then((result) => setSelectedProduct(result.data[0]));
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        productId: selectedProduct.productId,
        name: selectedProduct.productName,
        categoryId: selectedProduct.categoryId,
        brandId: selectedProduct.brandId,
        colorId: selectedProduct.colorId,
        usingStateId: selectedProduct.usingStateId,
        price: selectedProduct.price,
        description: selectedProduct.description,
        isOfferable: selectedProduct.isOfferable,
        ownerId: getFromLocalStorage("userId"),
      },
      onSubmit: (values) => {
        setIsSubmitting(true);
        const isOfferableBool = values.isOfferable === "true" ? true : false;
        const data = {
          productId: selectedProduct.productId,
          name: values.name,
          categoryId: values.categoryId,
          brandId:
            values.brandId === "0" ||
            values.brandId === 0 ||
            values.brandId === ""
              ? null
              : values.brandId,
          colorId:
            values.colorId === "0" ||
            values.colorId === 0 ||
            values.colorId === ""
              ? null
              : values.colorId,
          price: values.price,
          description: values.description,
          usingStateId: values.usingStateId,
          ownerId: values.ownerId,
          isSold: selectedProduct.isSold,
          isOfferable: isOfferableBool,
        };
        updateProduct(data)
          .then((response) => {
            if (response.success) {
              toast.success(response.message);

              getProduct(id).then((result) =>
                setSelectedProduct(result.data[0])
              );
            }
            setIsSubmitting(false);
          })
          .catch((err) => {
            err.Errors.map((error) => toast.error(error.ErrorMessage));
            setIsSubmitting(false);
          });
      },
      validationSchema: ProductSchema,
    });

  const handleAddFile = () => {
    setIsSubmitting(true);
    if (!file) {
      toast.error("Lütfen fotoğraf seçiniz");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const exists = selectedProduct.imagePath == null ? false : true;

    if (exists) {
      formData.append("productImageId", selectedProduct.productImageId);
    } else {
      formData.append("productId", selectedProduct.productId);
    }

    addImage(formData, exists)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          getProduct(id).then((result) => setSelectedProduct(result.data[0]));
          setFile(false);
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        toast.error(err.response.data.message);
      });
  };

  const handleDeleteImage = () => {
    setIsSubmitting(true);
    deleteProductImage(selectedProduct.productImageId).then((result) => {
      if (result.success) {
        toast.success(result.message);
      }
      setIsSubmitting(false);
      getProduct(id).then((result) => setSelectedProduct(result.data[0]));
    });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between px-6 lg:px-16 items-center lg:py-8 py-20">
      <div className="w-full sm:w-3/4 md:w-4/6 lg:mx-5 lg:w-1/2 xl:w-2/5 xl:mx-auto  bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-item ">
        <img
          src={
            selectedProduct.imagePath
              ? apiImagesUrl + selectedProduct.imagePath
              : defaultImage
          }
          className="object-cover object-center rounded-t-md w-full"
          alt=""
        />
        <div className="">
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
            <div>İsim</div>
            <div>{selectedProduct.productName}</div>
          </div>

          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
            <div>Kategori</div>
            <div>{selectedProduct.categoryName}</div>
          </div>

          {selectedProduct.brandName && (
            <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
              <div>Marka</div>
              <div>{selectedProduct.brandName}</div>
            </div>
          )}
          {selectedProduct.colorName && (
            <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
              <div>Renk</div>
              <div>{selectedProduct.colorName}</div>
            </div>
          )}

          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
            <div>Fiyat</div>
            <div>{selectedProduct.price}₺</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
            <div>Kullanım Durumu</div>
            <div>{selectedProduct.usingStateName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
            <div>Açıklama</div>
            <div>{selectedProduct.description}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold dark:border-gray-700">
            <div>Ürün Sahibi</div>
            <div>{selectedProduct.ownerName}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto items-start min-h-screen w-full sm:w-3/4 md:w-4/6  lg:w-1/2 xl:w-2/5">
        <div className="w-full py-10 shadow-item mt-14 bg-white dark:bg-gray-800 dark:text-white">
          <div className="w-10/12 lg:w-4/5 xl:w-3/4 mx-auto">
            <h1 className="font-extrabold text-3xl  mb-5 text-center">
              Ürün Güncelle
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-14 text-lg">
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ürün Adı"
                  className="text-darkBlue py-2 px-3 w-full mb-4"
                />

                {errors.name && touched.name && (
                  <div className="text-red-400 my-2 text-sm">{errors.name}</div>
                )}

                <select
                  className="text-darkBlue py-2 px-3 w-full mb-4"
                  name="categoryId"
                  value={values.categoryId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={0}>Kategori Seçiniz</option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                {errors.categoryId && touched.categoryId && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.categoryId}
                  </div>
                )}

                {selectedProduct.brandName && (
                  <div>
                    <select
                      className="text-darkBlue py-2 px-3 w-full mb-4"
                      name="brandId"
                      value={values.brandId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={0}>Marka Seçiniz</option>
                      {brands.map((brand) => (
                        <option key={brand.brandId} value={brand.brandId}>
                          {brand.name}
                        </option>
                      ))}
                    </select>

                    {errors.brandId && touched.brandId && (
                      <div className="text-red-400 my-2 text-sm">
                        {errors.brandId}
                      </div>
                    )}
                  </div>
                )}

                {selectedProduct.colorName && (
                  <div>
                    <select
                      className="text-darkBlue py-2 px-3 w-full mb-4"
                      name="colorId"
                      value={values.colorId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={0}>Renk Seçiniz</option>
                      {colors.map((color) => (
                        <option key={color.colorId} value={color.colorId}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                    {errors.colorId && touched.colorId && (
                      <div className="text-red-400 my-2 text-sm">
                        {errors.colorId}
                      </div>
                    )}
                  </div>
                )}

                <select
                  className="text-darkBlue py-2 px-3 w-full mb-4"
                  name="usingStateId"
                  value={values.usingStateId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={0}>Kullanım Durumu Seçiniz</option>
                  {usingStates.map((usingState) => (
                    <option
                      key={usingState.usingStateId}
                      value={usingState.usingStateId}
                    >
                      {usingState.name}
                    </option>
                  ))}
                </select>

                {errors.usingStateId && touched.usingStateId && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.usingStateId}
                  </div>
                )}

                <select
                  className="text-darkBlue py-2 px-3 w-full mb-4"
                  name="isOfferable"
                  value={values.isOfferable}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={0}>Teklif Durumu</option>
                  <option value={false}>Teklif verilemez</option>
                  <option value={true}>Teklif verilebilir</option>
                </select>
                {errors.isOfferable && touched.isOfferable && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.isOfferable}
                  </div>
                )}

                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Fiyat"
                  className="text-darkBlue py-2 px-3 w-full mb-4"
                />
                {errors.price && touched.price && (
                  <div className="text-red-400 my-2 text-sm">
                    {errors.price}
                  </div>
                )}

                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="3"
                  placeholder="Açıklama"
                  className="text-darkBlue py-2 px-3 w-full mb-4"
                />
                {errors.description && touched.description && (
                  <div className="text-red-400 mb-2 text-sm">
                    {errors.description}
                  </div>
                )}
              </div>
              <div className="text-right mt-5">
                <button
                  type="submit"
                  className={`btn text-lg ${isSubmitting ? "submitting" : ""}`}
                  disabled={isSubmitting}
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full py-3 px-14 shadow-item mt-14 bg-white dark:bg-gray-800 dark:text-white">
          <div className="mx-auto  text-center py-8">
            <h1 className="font-extrabold text-3xl  mb-5 text-center">
              Fotoğraf Ekle
            </h1>
            <div className=" bg-darkBlue text-gray-100  p-10 text-lg flex justify-center items-center">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className={`block w-full text-sm text-slate-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-100 file:text-darkBlue
                    hover:file:bg-violet-300 hover:file:text-black
                    file:cursor-pointer cursor-pointer ${
                      isSubmitting ? "submitting" : ""
                    }`}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-between mt-5">
              {selectedProduct.imagePath && (
                <button
                  onClick={handleDeleteImage}
                  className={`btn border-2 bg-white border-red-600 transition-all text-red-500 hover:bg-red-500 hover:text-white ${
                    isSubmitting ? "submitting" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  Fotoğrafı Sil
                </button>
              )}
              <div className="text-right">
                <button
                  onClick={handleAddFile}
                  className={`btn text-lg ${isSubmitting ? "submitting" : ""}`}
                  disabled={isSubmitting}
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updateproduct;
