import { userApi as api } from "../../../../lib/api-client";
import { TravelStyleData } from "../interfaces/interfaces";
export const onboardingService = {
  onboardingSource: async (data: { source: string }) => {
    const res = await api.post("/onboarding/source", data);
    return res.data;
  },
  setProfile: async (data: FormData) => {
    const res = await api.post("/onboarding/profile", data);
    return res.data;
  },
  setTravelStyle: async (data:TravelStyleData) => {
    const res = await api.post("/onboarding/travel-style", data);
    return res.data;
  },
};
