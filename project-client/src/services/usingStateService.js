import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getUsingStates = () => get(apiUrl + "/usingStates/getall");

export const postUsingState = (brand) =>
  post(apiUrl + "/usingStates/add", brand);

export const updateUsingState = (data) =>
  post(apiUrl + "/usingStates/update", data);

export const deleteUsingState = (data) =>
  post(apiUrl + "/usingStates/delete", data);
