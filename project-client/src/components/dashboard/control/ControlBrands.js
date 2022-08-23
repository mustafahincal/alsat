import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useBrandContext } from "../../../context/BrandContext";
import {
  deleteBrand,
  getBrands,
  postBrand,
  updateBrand,
} from "../../../services/brandService";
import { toast } from "react-toastify";
import { ControlSchema } from "../../../validations/controlSchema";

function ControlBrands() {
  const {
    brands,
    setBrands,
    selectedBrand,
    setSelectedBrand,
    updateBrandStatus,
    setUpdateBrandStatus,
  } = useBrandContext();
  useEffect(() => {
    getBrands().then((result) => setBrands(result.data));
    setUpdateBrandStatus(false);
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        if (!updateBrandStatus) {
          values = { name: capitalize(values.name) };
          postBrand(values)
            .then((response) => {
              if (response.success) {
                toast.success(response.message);
                getBrands().then((result) => setBrands(result.data));
                values.name = "";
              }
            })
            .catch((err) => toast.error(err.response.data.message));
        } else {
          const data = {
            brandId: selectedBrand.brandId,
            name: capitalize(values.name),
          };
          updateBrand(data)
            .then((response) => {
              if (response.success) {
                toast.success(response.message);
                getBrands().then((result) => setBrands(result.data));
                values.name = "";
                setUpdateBrandStatus(false);
              }
            })
            .catch((err) => toast.error(err.response.data.message));
        }
      },
      validationSchema: ControlSchema,
    });

  const handleDeleteBrand = (brandId) => {
    deleteBrand(brandId)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          getBrands().then((result) => setBrands(result.data));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateBrand = (brandId, brandName) => {
    if (!updateBrandStatus) {
      values.name = brandName;
    } else {
      values.name = "";
    }
    setUpdateBrandStatus(!updateBrandStatus);
    const brand = {
      brandId: brandId,
      name: brandName,
    };
    setSelectedBrand(brand);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex justify-between items-center p-16">
      <div className="w-1/3  mx-auto  bg-white rounded-md shadow-item px-4 py-5">
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <div
              className="py-2 px-3 bg-gold text-black rounded text-center flex justify-between items-center"
              key={brand.brandId}
            >
              <div>{brand.name}</div>
              <div className="flex">
                {updateBrandStatus ? (
                  <div
                    className="bg-indigo-500 text-white px-2 flex items-center justify-center rounded cursor-pointer mr-2"
                    onClick={() => handleUpdateBrand(brand.brandId, brand.name)}
                  >
                    Düzenlemeyi Sonlandır
                  </div>
                ) : (
                  <div
                    className="bg-blue-500 text-white px-2 flex items-center justify-center rounded cursor-pointer mr-2"
                    onClick={() => handleUpdateBrand(brand.brandId, brand.name)}
                  >
                    Düzenle
                  </div>
                )}

                <div
                  className="bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded cursor-pointer"
                  onClick={() => handleDeleteBrand(brand.brandId)}
                >
                  &#215;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 mx-auto  py-10 shadow-item  bg-white">
        <div className="w-3/4 m-auto">
          <h1 className="font-extrabold text-3xl text-black mb-5 text-center">
            {updateBrandStatus ? "Marka Güncelle" : "Marka Ekle"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex  flex-col bg-darkBlue text-gray-100  px-14 py-14 text-lg">
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                type="text"
                className="text-darkBlue py-2 px-4 w-full"
                placeholder="Marka"
                required
              />
              {errors.name && touched.name && (
                <div className="text-red-400 my-2 text-sm">{errors.name}</div>
              )}
            </div>
            <div className="text-right mt-5">
              {updateBrandStatus ? (
                <button type="submit" className="btn  text-lg">
                  Güncelle
                </button>
              ) : (
                <button type="submit" className="btn text-lg">
                  Ekle
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ControlBrands;
