import { useMutation, useQuery } from "@tanstack/react-query";

import { onboardingService } from "../services/onboarding.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/src/types/types";
import { useRouter } from "next/navigation";
import { TravelStyleData, TripPlanData } from "../interfaces/interfaces";
import { tripServices } from "../../trips/services/trip.service";
import { useAuthStore } from "@/src/store/auth.store";

export function useSetSource() {
  const router = useRouter();
  const { setOnboarding } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: (data: { source: string }) => onboardingService.onboardingSource(data),
    onSuccess: (res) => {
      setOnboarding(2, false);
      router.push("/onboarding/profile");
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useSetProfile() {
  const { setOnboarding } = useAuthStore((state) => state);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: FormData) => onboardingService.setProfile(data),
    onSuccess: (res) => {
      router.push("/onboarding/travel-style");
      toast.success(res.message);
      setOnboarding(3, false);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useSetTravelStyle() {
  const { setOnboarding } = useAuthStore((state) => state);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: TravelStyleData) => onboardingService.setTravelStyle(data),
    onSuccess: (res) => {
      const redirect = sessionStorage.getItem("postLoginRedirect");
      if (redirect) {
        sessionStorage.removeItem("postLoginRedirect");
        router.replace(redirect);
      } else {
        router.push("/onboarding/travel-plan");
      }
      setOnboarding(4, false);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useGetPlacesSuggestion(search: string, enabled: boolean) {
  return useQuery({
    queryKey: ["places", search],
    queryFn: () => onboardingService.getPlacesSuggestion(search),
    enabled: enabled && search.length >= 2,
  });
}

export function useCreateOnboardingTripPlan() {
  const { setOnboarding } = useAuthStore((state) => state);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: TripPlanData) => tripServices.createTripPlan(data),
    onSuccess: (res) => {
      router.push("/");
      setOnboarding(4, true);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useEditOnboardingProfile() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: object) => onboardingService.editOnboardingProfile(data),
    onSuccess: (res) => {
      router.push("/onboarding/travel-style");
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useEditTravelStyle() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: TravelStyleData) => onboardingService.editTravelStyle(data),
    onSuccess: (res) => {
      const redirect = sessionStorage.getItem("postLoginRedirect");
      if (redirect) {
        sessionStorage.removeItem("postLoginRedirect");
        router.replace(redirect);
      } else {
        router.replace("/onboarding/travel-plan");
      }
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
