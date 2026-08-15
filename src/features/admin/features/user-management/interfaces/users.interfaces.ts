import { UserAction } from "../components/UsersActionModal";

export type UserStatus = "active" | "suspended" | "banned";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  passwordHash: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  bio: string | null;
  dateOfBirth: Date | null;
  genderCode: string;
  countryCode: string | null;
  travelTypeCode: string;
  travelPersonalityCode: string;
  matchWithCode: string;
  accountStatusCode: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isIdVerified: boolean;
  phoneVerifiedAt: Date | null;
  emailVerifiedAt: Date | null;
  idVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  privacy?: string;
  location?: string;
  onboarding?: string;
};

export interface GetAllUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  verified?: string;
  joined?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ChangeUserStatus {
  userId: string;
  reason: string;
  action: "activate" | "suspend" | "ban";
}

export type TabId = "profile" | "activity" | "reports" | "trips";

export const TABS: { id: TabId; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "activity", label: "Activity" },
  { id: "reports", label: "Reports" },
  { id: "trips", label: "Trips" },
];

export interface ActionModalState {
  userId: string;
  action: UserAction;
}
export interface GetUserProfileResponseDTO {
  id: string;
  status: string;
  fullName: string;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  phone: string | null;
  isPhoneVerified: boolean;
  dob: Date;
  age: number | null;
  city: string | null;
  state: string | null;
  country: string | null;
  travelType: string | null;
  travelPersonality: string | null;
  gender: string | null;
  isTraveling: boolean;
  isEmailVerified: boolean;
  interests: string[];
  skills: string[];
  languages: string[];
  createdAt: Date;
  onboardingCompleted: boolean;
  onboardingStep: number;
  onboardingSource: string | null;
  matchWith: string;
  tripCount: number,
  connectionsCount:number
}

export interface GroupData {
  id: string;
  name: string;
  dateTo: Date;
  dateFrom: Date;
  coverUrl: string;
  destination: string;
  budgetStyle: string;
  members: { id: string; name: string; role: string; avatarUrl?: string }[];
}