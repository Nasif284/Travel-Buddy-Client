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

