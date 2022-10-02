import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getOffers = () => get(apiUrl + "/offers/getall");

export const getOfferDetails = () => get(apiUrl + "/offers/getofferdetails");

export const getOfferDetailsByUserId = (userId) =>
  get(apiUrl + "/offers/getofferdetailsbyuserid?userId=" + userId);

export const getOfferDetailsByOwnerId = (ownerId) =>
  get(apiUrl + "/offers/getofferdetailsbyownerid?ownerId=" + ownerId);

export const getOfferDetailsById = (id) =>
  get(apiUrl + "/offers/getofferdetailsbyid?id=" + id);

export const offerForProduct = (data) => {
  return post(apiUrl + "/offers/add", data);
};
export const deleteOffer = (offerId) =>
  get(apiUrl + "/offers/delete?offerId=" + offerId);

export const updateOffer = (data) => post(apiUrl + "/offers/update", data);
