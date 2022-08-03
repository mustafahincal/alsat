import { useEffect } from "react";
import { getBrands } from "../../services/brandService";
import { NavLink } from "react-router-dom";
import { useBrandContext } from "../../context/BrandContext";
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
    <div className="bg-white  rounded-lg flex flex-col shadow-item">
      <NavLink
        to="/main/products/"
        className="px-2  rounded py-2 border-b-2 font-bold"
      >
        Tüm Kategoriler
      </NavLink>
      {categories.map((category) => (
        <NavLink
          to={`/main/products/category/${category.categoryId}`}
          className={"px-2 rounded py-2 border-b-2 "}
          key={category.categoryId}
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Categories;
