import { useMutation } from "@tanstack/react-query";

import { onboardingService } from "../services/onboarding.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/src/types/types";
import { useRouter } from "next/navigation";
import { OnboardingProfileFormData } from "../validators/profile.validator";
import { TravelStyleData } from "../interfaces/interfaces";

export function useSetSource() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: {source:string}) => onboardingService.onboardingSource(data),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/onboarding/profile");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useSetProfile() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data:FormData) => onboardingService.setProfile(data),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/onboarding/travel-style");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useSetTravelStyle() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: TravelStyleData) => onboardingService.setTravelStyle(data),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
