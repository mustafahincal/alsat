import { getFromLocalStorage } from "./localStorageService";
import axios from "axios";
axios.defaults.headers.common = {
  Authorization: `Bearer ${getFromLocalStorage("token")}`,
};

function requestGet(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

function requestPost(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export const get = (url) => requestGet(url);
export const post = (url, data) => requestPost(url, data);
