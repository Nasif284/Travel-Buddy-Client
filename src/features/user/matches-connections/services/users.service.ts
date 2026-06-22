import { userApi as api } from "../../../../lib/api-client"

export const usersServices = {
  getUsersForCards: async (params: { page: number; limit: number }) => {
    const res = await api.get("/users/cards", { params });
    return res.data;
  },
  getNearbyUsers: async (params: { page: number; limit: number }) => {
    const res = await api.get("/users/nearby", { params });
    return res.data;
  },
  getTravelerProfile: async (id: string) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get(`/users/me`);
    return res.data;
  },
};