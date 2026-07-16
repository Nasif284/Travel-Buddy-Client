import { userApi as api } from "../../../../lib/api-client";
import { TripPlanData } from "../../onboarding/interfaces/interfaces";
import { EditTripData } from "../interfaces/interface";

export const tripServices = {
  getUserUpcomingTrips: async () => {
    const res = await api.get("/trip/upcoming");
    return res.data;
  },
  getUpcomingTrip: async (userId: string) => {
    const res = await api.get(`/trip/upcoming/${userId}`);
    return res.data;
  },
  getUserPastTrips: async () => {
    const res = await api.get("/trip/past");
    return res.data;
  },
  createTripPlan: async (data: TripPlanData) => {
    const res = await api.post("/trip", data);
    return res.data;
  },
  updateTrip: async (id: string, data: EditTripData) => {
    const res = await api.patch(`/trip/${id}`, data);
    return res.data;
  },
  deleteTrip: async (id: string) => {
    const res = await api.patch(`/trip/delete/${id}`);
    return res.data;
  },
  createGroup: async (id: string) => {
    const res = await api.post(`/trip/group/${id}`);
    return res.data;
  },
  getActiveGroups: async () => {
    const res = await api.get(`/trip/group/active`);
    return res.data;
  },
  getGroup :async (id: string) => {
    const res = await api.get(`/trip/group/${id}`);
    return res.data;
  } 
};
