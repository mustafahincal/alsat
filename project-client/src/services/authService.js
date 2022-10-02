import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const login = (loginDto) => post(apiUrl + "/auth/login", loginDto);

export const register = (registerDto) =>
  post(apiUrl + "/auth/register", registerDto);

export const changePassword = (changePasswordDto) =>
  post(apiUrl + "/auth/changepassword", changePasswordDto);

export const block = (email) => get(apiUrl + "/auth/block?email=" + email);

export const unBlock = (id) => get(apiUrl + "/auth/unblock?id=" + id);
