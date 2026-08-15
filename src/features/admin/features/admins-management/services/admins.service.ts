import { adminApi as api } from "@/src/lib/admin-api"
import { CreateAdminFormData, EditAdminFormData } from "../validators/validators";

export const adminsServices = {
  createAdmin: async (data: CreateAdminFormData) => {
    const res = await api.post("/auth/create", data);
    return res.data;
  },
  getAllAdmins: async () => {
    const res = await api.get("/admins");
    return res.data;
  },
  updateAdmin: async (id:string,data:EditAdminFormData) => {
    const res = await api.patch(`/admins/${id}`,data);
    return res.data;
  },
};

