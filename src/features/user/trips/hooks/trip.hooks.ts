import { tripServices } from "@/src/features/user/trips/services/trip.service";
import { ApiError } from "@/src/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { TripPlanData } from "../../onboarding/interfaces/interfaces";
import { EditTripData } from "../interfaces/interface";

export function useGetUserUpcomingTrips() {
  return useQuery({
    queryKey: ["upcoming_trips"],
    queryFn: () => tripServices.getUserUpcomingTrips(),
  });
}

export function useGetProfileUpcomingTrips(userId: string) {
  return useQuery({
    queryKey: ["profile_upcoming_trips"],
    queryFn: () => tripServices.getUpcomingTrip(userId),
    enabled: !!userId,
  });
}
export function useGetUserPastTrips() {
  return useQuery({
    queryKey: ["past_trips"],
    queryFn: () => tripServices.getUserPastTrips(),
  });
}

export function useCreateTripPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TripPlanData) => tripServices.createTripPlan(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["upcoming_trips"] });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
export function useUpdateTripPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditTripData }) => tripServices.updateTrip(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["upcoming_trips"] });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
export function useDeleteTripPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tripServices.deleteTrip(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["upcoming_trips"] });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
export function useGetActiveGroups() {
  return useQuery({
    queryKey: ["active_groups"],
    queryFn: () => tripServices.getActiveGroups(),
  });
}
export function useCrateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tripServices.createGroup(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["active_groups"] });
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
export function useGetGroup(id:string) {
  return useQuery({
    queryKey: ["group",id],
    queryFn: () => tripServices.getGroup(id),
  });
}