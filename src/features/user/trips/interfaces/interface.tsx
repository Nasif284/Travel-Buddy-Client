export type TripStatus = "active" | "past";

export interface Trip {
  id: string;
  name: string;
  destinationId: string;
  dateFrom: Date;
  dateTo: Date;
  budgetStyleCode: string;
  travelStyleCode: string;
  destination: { id: string; name: string; city: string | null; state: string | null; country: string; latitude: number; longitude: number; coverUrl: string | null };
  group: { id: string } | null;
}
export interface TripGroup {
  id: number;
  title: string;
  location: string;
  dates: string;
  status: TripGroupStatus;
  memberCount: number;
  extra: number;
  coverImage: string;
  members: TripMember[];
  ctaLabel: string;
  ctaStyle: "primary" | "secondary";
}
export type TripGroupStatus = "Confirmed" | "Planning" | "Completed" | "Voting";

export interface TripMember {
  avatar: string;
  name: string;
}



export interface Member {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
}


export interface EditTripData {
  dateFrom: Date;
  dateTo: Date;
  budgetStyleCode: string;
  travelStyleCode: string;
}

export interface GroupMembers {
  id: string;
  name: string;
  avatarUrl: string;
}
export interface GroupData {
  id: string;
  name: string;
  dateTo: Date;
  dateFrom: Date;
  coverUrl: string;
  destination: string;
  members: GroupMembers[];
}

export interface Activity {
  month: string;
  day: number;
  title: string;
  time: string;
  location: string;
  highlight?: boolean;
}

export interface Message {
  name: string;
  avatar: string;
  time: string;
  text: string;
}

export interface ChecklistItem {
  id: number;
  label: string;
  done: boolean;
}