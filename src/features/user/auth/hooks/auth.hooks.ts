"use client";
import { authService } from "@/src/features/user/auth/services/auth.service";
import { LoginInput, RegisterInput, ResetPassword, SendOtp, verifyEmail, VerifyOtp } from "../interfaces/auth.interfaces";
import { useAuthStore } from "@/src/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/src/types/types";



export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (res) => {
      setUser(res.data);
      toast.success(res.message);
      router.push("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useGoogleAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: (token: string) => authService.googleAuth(token),
    onSuccess: (res) => {
      setUser(res.data);
      toast.success(res.message);
      router.push("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (res) => {
      setUser(res.data);
      toast.success(res.message);
      router.push("/verify");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useVerify() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: verifyEmail) => authService.verifyEmail(data),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: (data: SendOtp) => authService.sendOtp(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (res) => {
      toast.success(res.message);
      logout();
      router.replace("/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useVerifyOtp() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: VerifyOtp) => authService.verifyOtp(data),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/forgot-password/reset");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useResetPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ResetPassword) => authService.resetPassword(data),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useForgotPasswordOtp() {
    const router = useRouter();
    return useMutation({
      mutationFn: (data: { email: string }) => authService.forgotPassword(data),
      onSuccess: (res) => {
        toast.success(res.message);
        router.push("/forgot-password/verify");
      },
      onError: (error: AxiosError<ApiError>) => {
        toast.error(error.response?.data?.error?.message || "Something went wrong");
      },
    });
}
