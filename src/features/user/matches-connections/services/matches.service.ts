import { userApi as api} from "../../../../lib/api-client";

export const matchesServices = {
  getActiveTrip: async () => {
    const res = await api.get("/trip/active");
    return res.data;
  },
  getTripMatches: async (tripId: string, query: { page: number; limit: number }) => {
    const res = await api.get(`/trip/matches/${tripId}`, { params: query });
    return res.data;
  },
  getMatchProfile: async (matchId:string) => {
    const res = await api.get(`/trip/matches/profile/${matchId}`);
    return res.data;
  },
};