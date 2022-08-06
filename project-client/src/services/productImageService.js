import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const addImage = (data, exists) => {
  if (exists) {
    return post(apiUrl + "/ProductImages/update", data);
  } else {
    return post(apiUrl + "/ProductImages/add", data);
  }
};
