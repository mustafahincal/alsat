import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import defaultImage from "../../assets/default.png";
import { useAuthContext } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";
import { getProduct } from "../../services/productService";

function ProductDetails() {
  const apiImagesUrl = "https://localhost:44322/uploads/images/";
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { isAdmin } = useAuthContext();
  const { id } = useParams();
  useEffect(() => {
    getProduct(id).then((result) => setSelectedProduct(result.data[0]));
  }, []);

  return (
    <div className="py-24 flex justify-between px-36">
      <div className="w-2/5 mb-16  bg-white rounded-md shadow-item mx-auto">
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
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>İsim</div>
            <div>{selectedProduct.productName}</div>
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
            <div>{selectedProduct.price}</div>
          </div>
        </div>
      </div>

      <div className="w-1/2 pt-20">
        <div className="bg-white rounded-md w-1/2 m-auto p-10 flex flex-col gap-3 shadow-item text-center">
          <NavLink
            to={`/offerForProduct/${selectedProduct.productId}`}
            className="btn  py-3"
          >
            Teklif Ver
          </NavLink>
          {isAdmin && (
            <NavLink
              to={`/updateProduct/${selectedProduct.productId}`}
              className="btn bg-littleDarkBlue font-bold py-3"
            >
              Ürünü Güncelle
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
