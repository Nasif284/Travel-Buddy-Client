import { tripServices } from "@/src/services/trip.service";
import { useQuery } from "@tanstack/react-query";

export function useGetUserUpcomingTrips() {
  return useQuery({
    queryKey: ["upcoming_trips"],
    queryFn: () => tripServices.getUserUpcomingTrips(),
  });
}

export function useGetProfileUpcomingTrips(userId:string) {
  return useQuery({
    queryKey: ["profile_upcoming_trips"],
      queryFn: () => tripServices.getUpcomingTrip(userId),
    enabled:!!userId
  });
}
