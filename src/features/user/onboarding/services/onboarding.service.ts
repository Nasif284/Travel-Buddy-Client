import axios from "axios";
import { userApi as api } from "../../../../lib/api-client";
import { TravelStyleData, TripPlanData } from "../interfaces/interfaces";
import { CreateTripFormData } from "../validators/tripPlan.validator";
export const onboardingService = {
  onboardingSource: async (data: { source: string }) => {
    const res = await api.post("/onboarding/source", data);
    return res.data;
  },
  setProfile: async (data: FormData) => {
    const res = await api.post("/onboarding/profile", data);
    return res.data;
  },
  setTravelStyle: async (data: TravelStyleData) => {
    const res = await api.post("/onboarding/travel-style", data);
    return res.data;
  },
  getPlacesSuggestion: async (value: string) => {
    const res = await axios.post(
      "/api/places/autocomplete",
      {
        input: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.data;
  },
  getPlaceDetails: async (placeId: string) => {
    const res = await axios.post(
      "/api/places/details",
      {
        placeId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.data;
  },
  createTripPlan: async (data: TripPlanData) => {
    const res = await api.post("/trip", data);
    return res.data;
  },
  
};
