import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCategoryContext } from "../../context/CategoryContext";
import { getCategories } from "../../services/categoryService";

function Categories() {
  const { categories, setCategories } = useCategoryContext();
  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {categories !== 0 && (
        <div className="bg-white  rounded-lg flex flex-col shadow-item2 mt-10 dark:bg-gray-800 dark:text-white">
          <NavLink
            to="/main/products/"
            className="px-2  rounded py-2 border-b-2 font-bold dark:border-gray-600"
          >
            Tüm Kategoriler
          </NavLink>
          {categories.map((category) => (
            <NavLink
              to={`/main/products/category/${category.categoryId}`}
              className={"px-2 rounded py-2 border-b-2  dark:border-gray-600"}
              key={category.categoryId}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
