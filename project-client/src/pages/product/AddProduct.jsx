import React, { useEffect } from "react";
import { useFormik } from "formik";
import { ProductSchema } from "../../validations/productSchema";
import { toast } from "react-toastify";
import { addProduct, getProducts } from "../../services/productService";
import { useBrandContext } from "../../context/BrandContext";
import { useColorContext } from "../../context/ColorContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { getBrands } from "../../services/brandService";
import { getColors } from "../../services/colorService";
import { useFileContext } from "../../context/FileContext";
import { getCategories } from "../../services/categoryService";
import { getFromLocalStorage } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { getUsingStates } from "../../services/usingStateService";
import { UseUsingStateContext } from "../../context/UsingStateContext";
import { useProductContext } from "../../context/ProductContext";
import { addImage } from "../../services/productImageService";
import { useSubmitContext } from "../../context/SubmitContext";

function AddProduct() {
  const { brands, setBrands } = useBrandContext();
  const { colors, setColors } = useColorContext();
  const { categories, setCategories } = useCategoryContext();
  const { file, setFile } = useFileContext();
  const { products, setProducts } = useProductContext();
  const { usingStates, setUsingStates } = UseUsingStateContext();
  const navigate = useNavigate();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();

  useEffect(() => {
    setIsSubmitting(false);
    getBrands().then((result) => setBrands(result.data));
    getColors().then((result) => setColors(result.data));
    getCategories().then((result) => setCategories(result.data));
    getUsingStates().then((result) => setUsingStates(result.data));
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        categoryId: "",
        brandId: "",
        colorId: "",
        price: "",
        description: "",
        usingStateId: "",
        ownerId: getFromLocalStorage("userId"),
        isOfferable: false,
        isSold: false,
      },
      onSubmit: (values, actions) => {
        if (file) {
          setIsSubmitting(true);
          const isOfferableBool = values.isOfferable === "true" ? true : false;
          const data = {
            ...values,
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
            isOfferable: isOfferableBool,
          };

          const formData = new FormData();
          formData.append("file", file);
          formData.append("body", JSON.stringify(data));

          addProduct(formData)
            .then((response) => {
              if (response.success) {
                toast.success(response.message);
                setFile(false);
                navigate("/main");
              }
              setIsSubmitting(false);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setIsSubmitting(false);
            });
        } else {
          toast.error("Lütfen ürün görseli ekleyiniz");
        }
      },
      validationSchema: ProductSchema,
    });

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-start min-h-screen px-6 sm:px-0">
      <div className="w-full sm:w-3/4 md:w-3/5 lg:w-2/5 m-auto py-10 shadow-item mt-14 bg-white  dark:bg-gray-800 dark:text-white">
        <div className="w-5/6 xl:w-3/4 mx-auto">
          <h1 className="font-extrabold text-3xl  mb-5 text-center">
            Ürün Ekle
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
                className="text-darkBlue py-2 px-3 w-full"
              />

              {errors.name && touched.name && (
                <div className="text-red-400 my-2 text-sm">{errors.name}</div>
              )}

              <select
                className="text-darkBlue py-2 px-3 w-full mt-4 gruop"
                name="categoryId"
                value={values.categoryId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={0}>Kategori Seçiniz</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && touched.categoryId && (
                <div className="text-red-400 my-2 text-sm">
                  {errors.categoryId}
                </div>
              )}

              <select
                className="text-darkBlue py-2 px-3 w-full mt-4"
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

              <select
                className="text-darkBlue py-2 px-3 w-full mt-4"
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

              <select
                className="text-darkBlue py-2 px-3 w-full mt-4"
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
                className="text-darkBlue py-2 px-3 w-full mt-4"
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
                className="text-darkBlue py-2 px-3 w-full mt-4"
              />
              {errors.price && touched.price && (
                <div className="text-red-400 my-2 text-sm">{errors.price}</div>
              )}

              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="3"
                placeholder="Açıklama"
                className="text-darkBlue py-2 px-3 w-full mt-4"
              />
              {errors.description && touched.description && (
                <div className="text-red-400 my-2 text-sm">
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
                Ürünü Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full sm:w-3/4 md:w-3/5 lg:w-1/3 mx-auto py-3 px-10 xl:px-14 shadow-item bg-white dark:bg-gray-800 dark:text-white my-10 sm:my-14">
        <div className="mx-auto text-center pt-10 pb-14">
          <h1 className="font-extrabold text-3xl mb-5 text-center">
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
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
