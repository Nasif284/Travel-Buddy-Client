import { userApi as api } from "@/src/lib/api-client";
import { CreateItineraryActivityRequestDTO, CreateItineraryDayRequestDTO } from "../interfaces/interfaces";
import { GenerateAiItineraryRequestDTO, GeneratedItinerary } from "../components/AiItineraryModal";

export const itineraryServices = {
  addDay: async (groupId: string, data: CreateItineraryDayRequestDTO) => {
    const res = await api.post(`/trip/group/${groupId}/itinerary/day`, data);
    return res.data;
  },
  getItinerary: async (groupId: string) => {
    const res = await api.get(`/trip/group/${groupId}/itinerary`);
    return res.data;
  },
  editDay: async (groupId: string, dayId: string, data: CreateItineraryDayRequestDTO) => {
    const res = await api.patch(`/trip/group/${groupId}/itinerary/days/${dayId}`, data);
    return res.data;
  },
  deleteDay: async (groupId: string, dayId: string) => {
    const res = await api.delete(`/trip/group/${groupId}/itinerary/days/${dayId}`);
    return res.data;
  },

  addActivity: async (groupId: string, dayId: string, data: CreateItineraryActivityRequestDTO) => {
    const res = await api.post(`/trip/group/${groupId}/itinerary/days/${dayId}/activities`, data);
    return res.data;
  },
  editActivity: async (groupId: string, dayId: string, activityId: string, data: CreateItineraryActivityRequestDTO) => {
    const res = await api.patch(`/trip/group/${groupId}/itinerary/days/${dayId}/activities/${activityId}`, data);
    return res.data;
  },
  toggleComplete: async (groupId: string, dayId: string, activityId: string) => {
    const res = await api.patch(`/trip/group/${groupId}/itinerary/days/${dayId}/activities/${activityId}/completion`);
    return res.data;
  },
  deleteActivity: async (groupId: string, dayId: string, activityId: string) => {
    const res = await api.delete(`/trip/group/${groupId}/itinerary/days/${dayId}/activities/${activityId}`);
    return res.data;
  },
  aiGenerate: async (groupId: string, data: GenerateAiItineraryRequestDTO) => {
    const res = await api.post(`/trip/group/${groupId}/itinerary/ai/generate`,data);
    return res.data;
    },
  saveGenerated :  async (groupId: string, data: GeneratedItinerary) => {
    const res = await api.post(`/trip/group/${groupId}/itinerary`,data);
    return res.data;
    },
};
