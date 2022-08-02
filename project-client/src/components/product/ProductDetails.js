import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import defaultImage from "../../assets/default.png";
import { useAuthContext } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";
import { getCar } from "../../services/productservice";

function ProductDetails() {
  const apiImagesUrl = "https://localhost:44322/uploads/images/";
  const { selectedProduct, setselectedProduct } = useProductContext();
  const { isAdmin } = useAuthContext();
  const { id } = useParams();
  useEffect(() => {
    getCar(id).then((result) => setselectedProduct(result.data[0]));
  }, []);

  return (
    <div className="p-16 flex justify-between">
      <div className="w-2/5 mb-16  bg-white rounded-md shadow-item mx-auto">
        <img
          src={
            selectedProduct.imagePath
              ? apiImagesUrl + selectedProduct.imagePath
              : defaultImage
          }
          className="object-cover object-center rounded-t-md"
          alt=""
        />
        {/* <div className="">
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Marka</div>
            <div>{selectedProduct.brandName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Model</div>
            <div>{selectedProduct.modelName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Renk</div>
            <div>{selectedProduct.colorName}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Model Yılı</div>
            <div>{selectedProduct.modelYear}</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Kiralama Ücreti</div>
            <div>{selectedProduct.dailyPrice}₺</div>
          </div>
          <div className="w-full flex justify-between border-2 py-3 px-20 font-bold">
            <div>Açıklama</div>
            <div>{selectedProduct.description}</div>
          </div>
        </div> */}
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
