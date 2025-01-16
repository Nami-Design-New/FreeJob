import axios from "axios";

const lang = sessionStorage.getItem("lang") || "ar";

const axiosInstance = axios.create({
  baseURL: "https://freejob.zeroonez.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    lang,
  },
});

export default axiosInstance;
