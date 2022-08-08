import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";
export const getColors = () => get(apiUrl + "/colors/getall");

export const postColor = (color) => post(apiUrl + "/colors/add", color);

export const updateColor = (data) => post(apiUrl + "/colors/update", data);

export const deleteColor = (data) => post(apiUrl + "/colors/delete", data);
