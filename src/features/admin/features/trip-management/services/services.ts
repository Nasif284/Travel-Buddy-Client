import { adminApi as api } from "@/src/lib/admin-api"
import { GetGroupsRequestDTO, GroupData } from "../interfaces/interfaces"

export const tripManagementServices = {
  getAllTripGroups: async (params: GetGroupsRequestDTO) => {
    const res = await api.get("/trips", { params });
    return res.data;
  },
  getGroup: async (id:string) => {
    const res = await api.get(`/trips/${id}`);
    return res.data;
  },
}; 