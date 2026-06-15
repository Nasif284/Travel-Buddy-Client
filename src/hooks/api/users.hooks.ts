import { usersServices } from "@/src/services/users.service";
import { useQuery } from "@tanstack/react-query";

export function useGetUsersForCards(params: { page: number; limit: number }) {
  return useQuery({
    queryKey: ["users_for_cards", params],
    queryFn: () => usersServices.getUsersForCards(params),
  });
}

export function useGetNearbyUsers(params: { page: number; limit: number }) {
  return useQuery({
    queryKey: ["nearby_users", params],
    queryFn: () => usersServices.getNearbyUsers(params),
  });
}

export function useTravelerProfile(id:string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => usersServices.getTravelerProfile(id),
  });
}