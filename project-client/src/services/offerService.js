import { get, getByAxios, post } from "./request";
const apiUrl = "https://localhost:44322/api";

export const getOffers = () => get(apiUrl + "/offers/getall");

export const offerForProduct = (data) => {
  console.log("hey");
  //post(apiUrl + "/brands/add", data);
};
