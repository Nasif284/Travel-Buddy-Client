import { useMutation, } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { callService } from "../services/call.service";
import { ApiError } from "@/src/types/types";

export function useCreateDirectCall() {
  return useMutation({
    mutationFn: (data: { recipientId: string; mediaType: "AUDIO" | "VIDEO" }) => callService.createDirectCall(data),
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Unable to start the call.");
    },
  });
}
export function useCreateGroupCall() {
  return useMutation({
    mutationFn: (data: { tripGroupId: string; mediaType: "AUDIO" | "VIDEO" }) => callService.createGroupCall(data),

    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Unable to start the group call.");
    },
  });
}
export function useJoinCall() {
  return useMutation({
    mutationFn: (callId: string) => callService.joinCall(callId),

    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Unable to join the call.");
    },
  });
}
export function useDeclineCall() {
  return useMutation({
    mutationFn: (callId: string) => callService.declineCall(callId),
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Unable to decline the call.");
    },
  });
}
export function useCancelCall() {
  return useMutation({
    mutationFn: (callId: string) => callService.cancelCall(callId),
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Unable to cancel the call.");
    },
  });
}

export function useLeaveCall() {
  return useMutation({
    mutationFn: (callId: string) => callService.leaveCall(callId),

    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Unable to leave the call.");
    },
  });
}