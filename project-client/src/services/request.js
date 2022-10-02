import { getFromLocalStorage } from "./localStorageService";
import axios from "axios";

function requestGet(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

function requestPost(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export const get = (url) => requestGet(url);
export const post = (url, data) => requestPost(url, data);
