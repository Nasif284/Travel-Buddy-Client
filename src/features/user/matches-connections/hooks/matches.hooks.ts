import { matchesServices } from "@/src/features/user/matches-connections/services/matches.service";
import { useQuery } from "@tanstack/react-query";

export function useGetActiveTrip() {
  return useQuery({
    queryKey: ["active_trip"],
    queryFn: () => matchesServices.getActiveTrip(),
  });
}

export function useGetTripMatches(tripId: string, query: { page: number; limit: number }) {
  return useQuery({
    queryKey: ["trip_matches", tripId,query],
      queryFn: () => matchesServices.getTripMatches(tripId, query),
    enabled:!!tripId
  });
}

export function useGetMatchProfile( matchId:string) {
  return useQuery({
    queryKey: ["trip_match_profile", matchId],
    queryFn: () => matchesServices.getMatchProfile(matchId),
    enabled: !!matchId,
  });
}

