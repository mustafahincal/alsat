import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getBrands = () => get(apiUrl + "/brands/getall");

export const postBrand = (brand) => post(apiUrl + "/brands/add", brand);

export const updateBrand = (data) => post(apiUrl + "/brands/update", data);

export const deleteBrand = (brandId) =>
  get(apiUrl + "/brands/delete?brandId=" + brandId);
