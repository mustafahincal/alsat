import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useBrandContext } from "../../context/BrandContext";
import { useColorContext } from "../../context/ColorContext";
import { getBrands } from "../../services/brandService";
import { getColors } from "../../services/colorService";
import defaultImage from "../../assets/default.png";
import { useFileContext } from "../../context/FileContext";
import { addImage } from "../../services/productImageService";
import { useProductContext } from "../../context/ProductContext";
import { ProductSchema } from "../../validations/productSchema";
import { getFromLocalStorage } from "../../services/localStorageService";
import { useCategoryContext } from "../../context/CategoryContext";
import { getCategories } from "../../services/categoryService";
import { getProduct } from "../../services/productService";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../services/productService";

function Updateproduct() {
  const { brands, setBrands } = useBrandContext();
  const { colors, setColors } = useColorContext();
  const { categories, setCategories } = useCategoryContext();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { file, setFile } = useFileContext();
  const { id } = useParams();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";

  useEffect(() => {
    getBrands().then((result) => setBrands(result.data));
    getColors().then((result) => setColors(result.data));
    getCategories().then((result) => setCategories(result.data));

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
        price: selectedProduct.price,
        description: selectedProduct.description,
        ownerId: getFromLocalStorage("userId"),
      },
      onSubmit: (values) => {
        updateProduct(values)
          .then((response) => {
            if (response.success) {
              toast.success(response.message);
              getProduct(id).then((result) =>
                setSelectedProduct(result.data[0])
              );
            }
          })
          .catch((err) =>
            err.Errors.map((error) => toast.error(error.ErrorMessage))
          );
        console.log(values);
      },
      validationSchema: ProductSchema,
    });

  const handleAddFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", selectedProduct.productId);

    const exists = selectedProduct.imagePath == null ? false : true;

    if (exists) {
      formData.append("productImageId", selectedProduct.productImageId);
    }

    addImage(formData, exists)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          getProduct(id).then((result) => setSelectedProduct(result.data[0]));
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="flex justify-between items-center px-16 py-8">
      <div className="w-2/5  mx-auto  bg-white rounded-md shadow-item ">
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
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>İsim</div>
            <div>{selectedProduct.productName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Marka</div>
            <div>{selectedProduct.brandName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Kategori</div>
            <div>{selectedProduct.categoryName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Renk</div>
            <div>{selectedProduct.colorName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Fiyat</div>
            <div>{selectedProduct.price}₺</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start min-h-screen w-1/2">
        <div className="w-4/5 m-auto py-10 shadow-item mt-14 bg-white">
          <div className="w-3/4 mx-auto">
            <h1 className="font-extrabold text-3xl text-black mb-5 text-center">
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
                <button type="submit" className="btn text-lg">
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-4/5 mx-auto py-3 px-14 shadow-item mt-14 bg-white">
          <div className="mx-auto text-center py-8">
            <h1 className="font-extrabold text-3xl text-black mb-5 text-center">
              Resim Ekle
            </h1>
            <div className=" bg-darkBlue text-gray-100  p-10 text-lg flex justify-center items-center">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-slate-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-100 file:text-darkBlue
                    hover:file:bg-violet-300 hover:file:text-black
                    file:cursor-pointer cursor-pointer"
              />
            </div>
            <div className="text-right mt-5">
              <button onClick={() => handleAddFile()} className="btn text-lg">
                Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updateproduct;
