import { get, post } from "./request";
const apiUrl = "https://localhost:44322/api";

export const login = (loginDto) => post(apiUrl + "/auth/login", loginDto);

export const register = (registerDto) =>
  post(apiUrl + "/auth/register", registerDto);
