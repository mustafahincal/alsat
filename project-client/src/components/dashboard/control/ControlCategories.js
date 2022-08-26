import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../services/categoryService";
import { useCategoryContext } from "../../../context/CategoryContext";
import { postCategory } from "../../../services/categoryService";
import { ControlSchema } from "../../../validations/controlSchema";

function ControlCategories() {
  const {
    categories,
    setCategories,
    updateCategoryStatus,
    setUpdateCategoryStatus,
    selectedCategory,
    setSelectedCategory,
  } = useCategoryContext();
  useEffect(() => {
    getCategories().then((result) => setCategories(result.data));
    setUpdateCategoryStatus(false);
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        if (!updateCategoryStatus) {
          values = { name: capitalize(values.name) };
          postCategory(values)
            .then((response) => {
              if (response.success) {
                toast.success(response.message);
                getCategories().then((result) => setCategories(result.data));
                values.name = "";
              }
            })
            .catch((err) => toast.error(err.response.data.message));
        } else {
          const data = {
            categoryId: selectedCategory.categoryId,
            name: capitalize(values.name),
          };
          updateCategory(data)
            .then((response) => {
              if (response.success) {
                toast.success(response.message);
                getCategories().then((result) => setCategories(result.data));
                values.name = "";
                setUpdateCategoryStatus(false);
              }
            })
            .catch((err) => toast.error(err.response.data.message));
        }
      },
      validationSchema: ControlSchema,
    });

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          getCategories().then((result) => setCategories(result.data));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCategory = (categoryId, categoryName) => {
    if (!updateCategoryStatus) {
      values.name = categoryName;
    } else {
      values.name = "";
    }
    setUpdateCategoryStatus(!updateCategoryStatus);
    const category = {
      categoryId: categoryId,
      name: categoryName,
    };
    setSelectedCategory(category);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center pt-16 lg:pb-16 md:px-16">
      <div className="w-full sm:w-2/3 md:w-1/3  mx-auto  bg-white dark:bg-gray-800 rounded-md shadow-item px-4 py-5 order-2 md:order-1">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <div
              className="py-2 px-3 bg-gold text-black rounded text-center flex justify-between items-center"
              key={category.categoryId}
            >
              <div>{category.name}</div>
              <div className="flex">
                {updateCategoryStatus ? (
                  <div
                    className="bg-indigo-500 text-white  px-2 flex items-center justify-center rounded cursor-pointer mr-2"
                    onClick={() =>
                      handleUpdateCategory(category.categoryId, category.name)
                    }
                  >
                    Düzenlemeyi Sonlandır
                  </div>
                ) : (
                  <div
                    className="bg-blue-500 text-white px-2 flex items-center justify-center rounded cursor-pointer mr-2"
                    onClick={() =>
                      handleUpdateCategory(category.categoryId, category.name)
                    }
                  >
                    Düzenle
                  </div>
                )}

                <div
                  className="bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded cursor-pointer"
                  onClick={() =>
                    handleDeleteCategory(category.categoryId, category.name)
                  }
                >
                  &#215;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 mx-auto mb-16  py-10 shadow-item  bg-white dark:bg-gray-800 dark:text-white order-1 md:order-2">
        <div className="w-3/4 m-auto">
          <h1 className="font-extrabold text-3xl mb-5 text-center">
            {updateCategoryStatus ? "Kategori Güncelle" : "Kategori Ekle"}
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
                placeholder="Kategori"
              />
              {errors.name && touched.name && (
                <div className="text-red-400 my-2 text-sm">{errors.name}</div>
              )}
            </div>
            <div className="text-right mt-5">
              {updateCategoryStatus ? (
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

export default ControlCategories;
