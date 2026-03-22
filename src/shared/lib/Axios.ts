import axios from "axios";
import { getCookie, removeCookie } from "../utils/Cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ,
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
    const status = error.response?.status;
    const url = error.config?.url || "";
    const isLoginEndpoint =
      url.includes("/auth/user/token") ||
      url.includes("/auth/user/token")

    if (!isLoginEndpoint && status === 401) {
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
