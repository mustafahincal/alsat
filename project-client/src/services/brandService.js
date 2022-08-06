import { get, getByAxios, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getBrands = () => get(apiUrl + "/brands/getall");

export const postBrand = (brand) => post(apiUrl + "/brands/add", brand);
export const deleteBrand = (data) => post(apiUrl + "/brands/delete", data);
