import { ConnectionRequestData } from "@/src/features/user/matches-connections/interfaces/connection.interface";
import { connectionServices } from "@/src/features/user/matches-connections/services/connection.service";
import { ApiError } from "@/src/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useSendConnectionRequest() {
  return useMutation({
    mutationFn: (data: ConnectionRequestData) => connectionServices.sendConnectionRequest(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useAcceptRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectionServices.acceptRequest(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["incoming_requests"] });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useRejectRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectionServices.rejectRequest(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["incoming_requests"] });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useGetIncomingRequests() {
  return useQuery({
    queryKey: ["incoming_requests"],
    queryFn: () => connectionServices.getIncomingRequests(),
  });
}

export function useGetConnections() {
  return useQuery({
    queryKey: ["connections"],
    queryFn: () => connectionServices.getConnections(),
  });
}

export function useGetAllRequests() {
  return useQuery({
    queryKey: ["all_requests"],
    queryFn: () => connectionServices.getAllRequests(),
  });
}

export function useDisconnect() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectionServices.disconnect(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

