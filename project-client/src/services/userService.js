import { useUserContext } from "../context/UserContext";
import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const getUsers = () => get(apiUrl + "/Users/getall");
export const getUserById = (userId) =>
  get(apiUrl + "/Users/getbyid?id=" + userId);

export const deleteAccount = (data) => post(apiUrl + "/Users/delete", data);
