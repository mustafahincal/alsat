import { useUserContext } from "../context/UserContext";
import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getUsers = () => get(apiUrl + "/users/getuserdetails");
export const getUserById = (userId) =>
  get(apiUrl + "/users/getuserdetailsbyid?id=" + userId);

export const updateUser = (data) => post(apiUrl + "/users/update", data);

export const deleteAccount = (userId) =>
  get(apiUrl + "/users/delete?id=" + userId);
