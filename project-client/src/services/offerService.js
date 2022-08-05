import { get, getByAxios, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getOffers = () => get(apiUrl + "/offers/getall");

export const getOfferDetailsByUserId = (userId) =>
  get(apiUrl + "/offers/getofferdetailsbyuserid?userId=" + userId);

export const getOfferDetailsByOwnerId = (ownerId) =>
  get(apiUrl + "/offers/getofferdetailsbyownerid?ownerId=" + ownerId);

export const offerForProduct = (data) => {
  console.log("hey");
  //post(apiUrl + "/brands/add", data);
};
