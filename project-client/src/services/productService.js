import { get, post } from "./request";
const apiUrl = "https://localhost:44322/api";

export const getProducts = () => get(apiUrl + "/products/getproductdetails");
export const getProductsByBrand = (brandId) =>
  get(apiUrl + "/products/getproductdetailsbybrandid?brandId=" + brandId);
export const getProductsByColor = (colorId) =>
  get(apiUrl + "/products/getproductdetailsbycolorid?colorId=" + colorId);
export const getProduct = (id) =>
  get(apiUrl + "/products/getproductdetailsbyid?id=" + id);

export const addProduct = (data) => post(apiUrl + "/products/add", data);
export const updateProduct = (data) => post(apiUrl + "/products/update", data);
