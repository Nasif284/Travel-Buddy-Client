export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};
export type Traveler = {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  coverImage: string;
  avatarImage: string;
  matchPercent: number;
  badge: string; 
  dates: string;
  budget: string;
  tags: string[];
  requestSent?: boolean;
};

export type NearbyTraveler = {
  id: string;
  name: string;
  avatarImage: string;
  distance: string;
};