import { UserWithDetails } from "@/src/Interfaces/users.interface";
export interface MatchData {
  id: string;
  matchedTripId: string;
  totalPoints: number;
  dateFrom: Date;
  dateTo: Date;
  destination: string;
}
export interface TripMatchData {
  user: UserWithDetails;
  tripMatch: MatchData;
}
export interface TripCardData {
  id: string;
  name: string;
  destinationId: string;
  dateFrom: Date;
  dateTo: Date;
  budgetStyleCode: string;
  travelStyleCode: string;
  destination: MatchDestinationDTO;
}

export interface MatchDestinationDTO {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
  coverUrl: string | null;
}

export interface Connection {
  fullName: string;
  id: string;
  state: string;
  country: string;
  avatarUrl: string;
}
