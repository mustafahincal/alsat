import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const addImage = (data, exists) => {
  if (exists) {
    return post(apiUrl + "/productImages/update", data);
  } else {
    return post(apiUrl + "/productImages/add", data);
  }
};

export const deleteProductImage = (data) =>
  post(apiUrl + "/productImages/delete", data);
