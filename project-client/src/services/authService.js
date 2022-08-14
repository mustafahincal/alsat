import { get, post } from "./request";
const apiUrl = "https://localhost:44350/api";

export const login = (loginDto) => post(apiUrl + "/auth/login", loginDto);

export const register = (registerDto) =>
  post(apiUrl + "/auth/register", registerDto);

export const changePassword = (changePasswordDto) =>
  post(apiUrl + "/auth/changepassword", changePasswordDto);

export const blockUser = (loginDto) =>
  post(apiUrl + "/auth/blockuser", loginDto);
