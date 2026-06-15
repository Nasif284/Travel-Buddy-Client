export type Option = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export interface TravelStyleData {
  travelType: string;
  interests: string[];
  travelPersonality: string;
  matchWith: string;
}