import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getCreditCardDetails = () =>
  get(apiUrl + "/creditCards/getCreditCardDetails");

export const getCreditCardDetailsByUserId = (userId) =>
  get(apiUrl + "/creditCards/getcreditcarddetailsbyuserid?userId=" + userId);

export const getCreditCardDetailsById = (id) =>
  get(apiUrl + "/creditCards/getcreditcarddetailsbyid?id=" + id);

export const getCreditCardById = (id) =>
  get(apiUrl + "/creditCards/getbyid?id=" + id);

export const saveCreditCard = (creditCard) =>
  post(apiUrl + "/creditCards/add", creditCard);

export const deleteCreditCard = (creditCardId) =>
  get(apiUrl + "/creditCards/delete?creditCardId=" + creditCardId);

export const updateCreditCard = (creditCard) =>
  post(apiUrl + "/creditCards/update", creditCard);
