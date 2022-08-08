import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getCategories = () => get(apiUrl + "/categories/getall");

export const postCategory = (category) =>
  post(apiUrl + "/categories/add", category);

export const updateCategory = (data) =>
  post(apiUrl + "/categories/update", data);

export const deleteCategory = (data) =>
  post(apiUrl + "/categories/delete", data);
