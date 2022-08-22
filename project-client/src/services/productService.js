import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getProducts = () => get(apiUrl + "/products/getproductdetails");

export const getProductsByBrand = (brandId) =>
  get(apiUrl + "/products/getproductdetailsbybrandid?brandId=" + brandId);

export const getProductsByColor = (colorId) =>
  get(apiUrl + "/products/getproductdetailsbycolorid?colorId=" + colorId);

export const getProductsByCategory = (categoryId) =>
  get(
    apiUrl + "/products/getproductdetailsbycategoryid?categoryId=" + categoryId
  );

export const getProductsByOwner = (ownerId) =>
  get(apiUrl + "/products/getproductdetailsbyownerid?ownerId=" + ownerId);

export const getProduct = (id) =>
  get(apiUrl + "/products/getproductdetailsbyid?id=" + id);

export const getProductsByBrandAndByColor = async (brandId, colorId) => {
  let products;
  await get(apiUrl + "/products/getproductdetails").then(
    (result) => (products = result.data)
  );
  let filteredProducts = products.filter(
    (product) => product.brandId == brandId && product.colorId == colorId
  );
  return filteredProducts;
};

export const addProduct = (data) => post(apiUrl + "/products/add", data);
export const updateProduct = (data) => post(apiUrl + "/products/update", data);
export const deleteProduct = (productId) =>
  get(apiUrl + "/products/delete?productId=" + productId);
