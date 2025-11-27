import axios from "axios";
import { config } from "@/config/env";

const api = axios.create({
  baseURL: config.API_URL, // Your backend's URL
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      (originalRequest.url === "/auth/refresh" || 
       originalRequest.url === "/auth/logout")
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;