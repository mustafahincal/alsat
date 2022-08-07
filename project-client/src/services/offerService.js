import { get, getByAxios, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getOffers = () => get(apiUrl + "/offers/getall");

export const getOfferDetailsByUserId = (userId) =>
  get(apiUrl + "/offers/getofferdetailsbyuserid?userId=" + userId);

export const getOfferDetailsByOwnerId = (ownerId) =>
  get(apiUrl + "/offers/getofferdetailsbyownerid?ownerId=" + ownerId);

export const offerForProduct = (data) => {
  return post(apiUrl + "/offers/add", data);
};

export const deleteOffer = (data) => post(apiUrl + "/offers/delete", data);
export const updateOffer = (data) => post(apiUrl + "/offers/update", data);
