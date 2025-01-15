import axios from "axios";

const lang = sessionStorage.getItem("lang") || "ar";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    lang,
  },
});

export default axios;
