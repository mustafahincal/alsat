import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getUsingStates = () => get(apiUrl + "/usingStates/getall");

export const postUsingState = (data) => post(apiUrl + "/usingStates/add", data);

export const updateUsingState = (data) =>
  post(apiUrl + "/usingStates/update", data);

export const deleteUsingState = (usingStateId) =>
  get(apiUrl + "/usingStates/delete?usingStateId=" + usingStateId);
