import axios from "axios";
import { HttpCodes } from "../utils/constants/HttpCodes.containts";

export const adminApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/admin`,
  withCredentials: true,
});

adminApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === HttpCodes.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        return adminApi(originalRequest);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
