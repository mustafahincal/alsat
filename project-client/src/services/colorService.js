import { get, post } from "./request";
const apiUrl = "https://localhost:44322/api";
export const getColors = () => get(apiUrl + "/colors/getall");

export const postColor = (color) => post(apiUrl + "/colors/add", color);
