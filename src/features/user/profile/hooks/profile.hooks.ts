import { SettingsData, UpdateProfileData } from "@/src/features/user/profile/interfaces/profile.interface";
import { ProfileServices } from "@/src/features/user/profile/services/profile.service";
import { ApiError } from "@/src/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { ResetPassword } from "../../auth/interfaces/auth.interfaces";
import { authService } from "../../auth/services/auth.service";
import { useCallback, useEffect, useRef, useState } from "react";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileData) => ProfileServices.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_profile"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useUpdateCover() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => ProfileServices.updateCover(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_profile"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => ProfileServices.updateAvatar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_profile"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPassword) => authService.resetPassword(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useSendPhoneOtp() {
  return useMutation({
    mutationFn: (data: { phone: string }) => ProfileServices.sendPhoneOtp(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useVerifyPhoneOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { phone: string; otp: string }) => ProfileServices.verifyPhoneOtp(data),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["profile_settings"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useGetSettings() {
  return useQuery({
    queryKey: ["profile_settings"],
    queryFn: () => ProfileServices.getSettings(),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SettingsData) => ProfileServices.updateSettings(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["profile_settings"],
      });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useCountdown(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setTimeLeft(seconds);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [seconds]);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    [],
  );

  const formatted = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;
  const expired = timeLeft === 0;

  return { formatted, expired, start };
}

export function useSubmitVerifyDocs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => ProfileServices.submitVerificationDocs(data),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["doc_verification_status"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
export function useGetDocVerificationStatus() {
  return useQuery({
    queryKey: ["doc_verification_status"],
    queryFn: () => ProfileServices.getDocVerifyStatus(),
  });
}
