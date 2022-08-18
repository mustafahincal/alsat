import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const saveCreditCard = (creditCard) =>
  post(apiUrl + "/creditCards/add", creditCard);

export const removeCreditCard = (data) =>
  post(apiUrl + "/creditCards/delete", data);
