import { userApi as api } from "../lib/api-client"

export const tripServices = {
  getUserUpcomingTrips: async () => {
    const res = await api.get("/trip/upcoming");
    return res.data;
  },
  getUpcomingTrip: async (userId:string) => {
    const res = await api.get(`/trip/upcoming/${userId}`);
    return res.data;
  },
};