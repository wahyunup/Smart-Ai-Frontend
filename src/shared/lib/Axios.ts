import axios from "axios";
import { getCookie, removeCookie } from "../utils/Cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_LOCALHOST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("accesstoken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (Response) => {
    return Response;
  },
  async (error) => {
    if (error.response && [401].includes(error.response.status)) {
      console.error("accessToken Expired");
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

const redirectToLogin = () => {
  removeCookie("accesstoken");
  window.location.href = "/";
};

export default api;
