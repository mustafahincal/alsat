import React, { useEffect } from "react";
import { getCategories } from "../../services/categoryService";
import { useCategoryContext } from "../../context/CategoryContext";
import { NavLink } from "react-router-dom";
import Products from "../product/Products";
import { useProductContext } from "../../context/ProductContext";
import { getProducts } from "../../services/productService";
import defaultImage from "../../assets/default.png";
import { useAuthContext } from "../../context/AuthContext";

function Home() {
  const { products, setProducts } = useProductContext();
  const { isLogged } = useAuthContext();
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  useEffect(() => {
    getProducts().then((result) => setProducts(result.data));
  }, []);

  return (
    <div className=" px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="h-[400px] w-full  bg-white rounded-2xl p-10  shadow-item2 bg-home-bg bg-cover bg-center flex items-end mt-10">
        <div className="flex">
          <NavLink
            to={"/main"}
            className="btn px-10 text-base rounded-2xl py-3 font-bold mr-6 text-center flex justify-center items-center bg-white text-darkBlue hover:bg-darkBlue hover:text-white transition-all duration-15"
          >
            Ürün Al
          </NavLink>
          <NavLink
            to={"/addProduct"}
            className="btn px-10 text-base rounded-2xl py-3 font-bold mr-6 text-center flex justify-center items-center bg-white text-darkBlue hover:bg-darkBlue hover:text-white transition-all duration-150"
          >
            Ürün Sat
          </NavLink>
        </div>
      </div>
      <div className="w-11/12 m-auto my-24">
        <div className="text-3xl mb-5 font-bold">Güncel İlanlar</div>
        <div className="bg-gray-100 dark:bg-gray-700">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10 sm:gap-y-10 md:gap-y-20">
            {products.map(
              (product, index) =>
                index < 8 &&
                !product.isSold && (
                  <NavLink
                    key={index}
                    className="flex flex-col justify-between rounded-md h-full  shadow-item mb-10 dark:bg-darkBlue dark:text-white col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
                    to={
                      isLogged
                        ? `/productdetails/${product.productId}`
                        : "/login"
                    }
                  >
                    <img
                      src={
                        product.imagePath
                          ? apiImagesUrl + product.imagePath
                          : defaultImage
                      }
                      className="rounded-t-md h-2/3 object-cover object-center w-full flex-shrink-0"
                      alt=""
                    />
                    <div className="text-center bg-white dark:bg-gray-800 flex flex-col h-full justify-between py-3 px-5">
                      <div className="flex justify-between">
                        <p>Ürün</p>
                        <p>{product.productName}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Kategori</p>
                        <p>{product.categoryName}</p>
                      </div>
                      {product.brandName && (
                        <div className="flex justify-between">
                          <p>Marka</p>
                          <p>{product.brandName}</p>
                        </div>
                      )}
                      {product.colorName && (
                        <div className="flex justify-between">
                          <p>Renk</p>
                          <p>{product.colorName}</p>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <p>Fiyat</p>
                        <p>{product.price}₺</p>
                      </div>
                    </div>

                    <div>
                      {product.isOfferable ? (
                        <div className="py-1 bg-teal-500 text-white text-center text-sm">
                          Teklif Verilebilir
                        </div>
                      ) : (
                        <div className="py-1 bg-indigo-500  text-white text-center text-sm">
                          Teklif Verilemez
                        </div>
                      )}

                      {product.isSold ? (
                        <div className="py-1 bg-rose-500 rounded-b text-white text-center text-sm ">
                          Satıldı
                        </div>
                      ) : (
                        <div className="py-1 bg-lime-500 rounded-b text-white text-center text-sm">
                          Satılmadı
                        </div>
                      )}
                    </div>
                  </NavLink>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
