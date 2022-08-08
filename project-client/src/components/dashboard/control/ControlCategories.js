import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  deleteCategory,
  getCategories,
} from "../../../services/categoryService";
import { useCategoryContext } from "../../../context/CategoryContext";
import { postCategory } from "../../../services/categoryService";
import { ControlSchema } from "../../../validations/controlSchema";

function ControlCategories() {
  const { categories, setCategories, updateStatus, setUpdateStatus } =
    useCategoryContext();
  useEffect(() => {
    getCategories().then((result) => setCategories(result.data));
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        postCategory(values)
          .then((response) => {
            if (response.success) {
              toast.success(response.message);
              getCategories().then((result) => setCategories(result.data));
              values.name = "";
            }
          })
          .catch((err) => console.log(err));
      },
      validationSchema: ControlSchema,
    });

  const handleCategoryDelete = (categoryId, categoryName) => {
    const categoryToDelete = {
      categoryId: categoryId,
      name: categoryName,
    };
    deleteCategory(categoryToDelete)
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          getCategories().then((result) => setCategories(result.data));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryUpdate = (categoryId, categoryName) => {
    values.name = categoryName;
  };

  return (
    <div className="flex justify-between items-center p-16">
      <div className="w-1/3  mx-auto  bg-white rounded-md shadow-item px-4 py-5">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <div
              className="py-2 px-3 bg-gold text-black rounded text-center flex justify-between items-center"
              key={category.categoryId}
            >
              <div>{category.name}</div>
              <div className="flex">
                <div
                  className="bg-lime-500 text-white px-2 flex items-center justify-center rounded cursor-pointer mr-2"
                  onClick={() =>
                    handleCategoryUpdate(category.categoryId, category.name)
                  }
                >
                  Düzenle
                </div>
                <div
                  className="bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded cursor-pointer"
                  onClick={() =>
                    handleCategoryDelete(category.categoryId, category.name)
                  }
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
            Kategori Ekle
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
              <button type="submit" className="btn text-lg">
                Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ControlCategories;
