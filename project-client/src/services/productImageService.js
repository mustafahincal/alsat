import { get, post } from "./request";
const apiUrl = "https://localhost:44322/api";

export const addImage = (data) => post(apiUrl + "/ProductImages/add", data);
