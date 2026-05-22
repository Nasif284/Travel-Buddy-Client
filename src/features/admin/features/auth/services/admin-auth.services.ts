import { adminApi as api } from "@/src/lib/admin-api";
import { AdminLoginInput, CreateAdminInput } from "../interfaces/admin-auth.interfaces";

export const adminService = {
  create: async (data: CreateAdminInput) => {
    const res = await api.post("/create", data);
    return res.data;
  },

  login: async (data: AdminLoginInput) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },
};
