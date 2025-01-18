import axios from "axios";
const lang = sessionStorage.getItem("lang") || "ar";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "https://freejob.zeroonez.com/api";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["lang"] = lang;

// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log("Request Headers:", config.headers); // Log the headers
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
