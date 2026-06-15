export interface UserWithDetails {
  id: string;
  fullName: string;
  avatarUrl: string;
  state: string;
  coverUrl: string;
  age: number | null;
  city: string | null;
  country: string | null;
  travelType: string | null;
  travelPersonality: string | null;
  interests: string[];
  distanceKm?: number;
}
