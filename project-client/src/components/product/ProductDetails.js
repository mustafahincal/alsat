import { useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default.png";
import { useAuthContext } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";
import { useUserContext } from "../../context/UserContext";
import { setToLocalStorage } from "../../services/localStorageService";
import { deleteProduct, getProduct } from "../../services/productService";
import { toast } from "react-toastify";
import { deleteProductImage } from "../../services/productImageService";
import { useSubmitContext } from "../../context/SubmitContext";

function ProductDetails() {
  const apiImagesUrl = "https://localhost:44350/uploads/images/";
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { selectedUser } = useUserContext();
  const { isAdmin } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSubmitting, setIsSubmitting } = useSubmitContext();
  useEffect(() => {
    setIsSubmitting(false);
    getProduct(id).then((result) => {
      setSelectedProduct(result.data[0]);
      setToLocalStorage("productId", result.data[0].productId);
    });
  }, []);

  const handleDeleteProduct = () => {
    setIsSubmitting(true);
    if (selectedProduct.productImageId) {
      setTimeout(() => {
        deleteProductImage(selectedProduct.productImageId)
          .then((result) => {
            if (result.success) {
              deleteProduct(selectedProduct.productId)
                .then((response) => {
                  toast.success(response.message);
                  setIsSubmitting(false);
                  navigate("/main");
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }, 2000);
    } else {
      deleteProduct(selectedProduct.productId)
        .then((response) => {
          setIsSubmitting(false);
          toast.success(response.message);
          navigate("/main");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="py-24 flex flex-col lg:flex-row lg:justify-between px-6 lg:px-36">
      <div className="w-full sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5 mb-16  bg-white dark:bg-gray-800 dark:text-white  rounded-md shadow-item mx-auto">
        <img
          src={
            selectedProduct.imagePath
              ? apiImagesUrl + selectedProduct.imagePath
              : defaultImage
          }
          className="object-cover object-center rounded-t-md w-full"
          alt=""
        />
        <div>
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

      <div className="w-full sm:w-3/4 md:w-4/6 lg:w-1/3 xl:w-1/4 pt-20 mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-md w-full m-auto p-10 flex flex-col gap-3 shadow-item text-center">
          {selectedProduct.ownerId != selectedUser.userId && (
            <div className="flex flex-col w-full">
              {selectedProduct.isOfferable && (
                <div className="flex flex-col w-full">
                  {!selectedProduct.isSold && (
                    <NavLink
                      to={`/offerForProduct/${selectedProduct.productId}`}
                      className="rounded text-lg border-2 border-darkBlue bg-darkBlue py-2 text-white"
                    >
                      Teklif Ver
                    </NavLink>
                  )}
                </div>
              )}

              {!selectedProduct.isSold ? (
                <NavLink
                  to={`/payment/product/${selectedProduct.productId}`}
                  className="rounded text-lg border-2 border-darkBlue bg-darkBlue py-2 text-white mt-4"
                >
                  Satın Al
                </NavLink>
              ) : (
                <div className="flex flex-col">
                  <p className="text-2xl"> Ürün Satılmıştır</p>
                  <NavLink
                    className="btn bg-white border-4 border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white transition-all  text-2xl mt-4"
                    to={"/main"}
                  >
                    Diğer Ürünler
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {selectedProduct.ownerId == selectedUser.userId && (
            <div>
              {!selectedProduct.isSold ? (
                <div className="flex flex-col w-full">
                  <NavLink
                    to={
                      isSubmitting
                        ? ""
                        : `/updateProduct/${selectedProduct.productId}`
                    }
                    className={`rounded text-lg border-2 border-littleDarkBlue bg-littleDarkBlue py-2 text-white  ${
                      isSubmitting ? "submitting" : ""
                    }`}
                  >
                    Ürünü Güncelle
                  </NavLink>
                  <button
                    onClick={handleDeleteProduct}
                    className={`rounded bg-transparent text-lg text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 py-2 mt-4 ${
                      isSubmitting ? "submitting" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Ürünü Sil
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-2xl"> Ürün Satılmıştır</p>
                  <NavLink
                    className="btn dark:bg-gray-800 bg-white border-4 dark:border-white dark:text-white border-darkBlue text-darkBlue hover:bg-darkBlue dark:hover:bg-white dark:hover:text-darkBlue hover:text-white transition-all  text-2xl mt-4"
                    to={"/main"}
                  >
                    Diğer Ürünler
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
