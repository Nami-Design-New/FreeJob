import axios from "axios";
const lang = localStorage.getItem("lang") || "ar";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "https://freejob.zeroonez.com/api";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["lang"] = lang;

export default axiosInstance;
