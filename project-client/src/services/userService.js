import { useUserContext } from "../context/UserContext";
import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getUsers = () => get(apiUrl + "/users/getall");
export const getUserById = (userId) =>
  get(apiUrl + "/users/getbyid?id=" + userId);

export const deleteAccount = (userId) =>
  get(apiUrl + "/users/delete?id=" + userId);
