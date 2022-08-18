import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getCreditCardById = (id) =>
  get(apiUrl + "/creditCards/getbyid?id=" + id);

export const saveCreditCard = (creditCard) =>
  post(apiUrl + "/creditCards/add", creditCard);

export const removeCreditCard = (data) =>
  post(apiUrl + "/creditCards/delete", data);

export const updateCreditCard = (creditCard) =>
  post(apiUrl + "/creditCards/update", creditCard);
