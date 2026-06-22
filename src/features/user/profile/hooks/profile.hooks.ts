import { SettingsData, UpdateProfileData } from "@/src/features/user/profile/interfaces/profile.interface";
import { ProfileServices } from "@/src/features/user/profile/services/profile.service";
import { ApiError } from "@/src/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { ResetPassword } from "../../auth/interfaces/auth.interfaces";
import { authService } from "../../auth/services/auth.service";

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
      toast.success(res.message)
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}