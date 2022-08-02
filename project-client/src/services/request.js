import { getFromLocalStorage } from "./localStorageService";
import axios from "axios";
axios.defaults.headers.common = {
  Authorization: `Bearer ${getFromLocalStorage("token")}`,
};

// function request(url, data = false, method = "GET") {
//   return new Promise(async (resolve, reject) => {
//     const options = {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + getFromLocalStorage("token"),
//       },
//     };

//     if (data && method === "POST") {
//       options.body = JSON.stringify(data);
//     }
//     console.log(options.body);
//     const response = await fetch(url, options);
//     const result = await response.json();
//     if (response.ok) {
//       resolve(result);
//     } else {
//       reject(result);
//     }
//   });
// }

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
