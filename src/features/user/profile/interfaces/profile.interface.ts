export interface BuddyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  user: {
    name: string;
    avatarUrl: string;
  };
}

export interface UserProfile {
  id: string;
  fullName: string;
  bio: string | null;
  phone: string | null,
  isPhoneVerified:boolean,
  avatarUrl: string | null;
  coverUrl: string | null;
  age: number | null;
  city: string | null;
  state: string | null;
  country: string | null;
  travelType: string | null;
  travelPersonality: string | null;
  isTraveling: boolean;
  interests: string[];
  skills: string[];
  languages: string[];
  createdAt: Date;
}

export interface UpdateProfileData {
  fullName: string;
  bio: string;
  isTraveling: boolean;
  travelPersonalityCode: string;
  interests: string[];
  languages: string[];
  skills: string[];
}

export interface ConnectionRequest {
  id: string;
  status: string;
  message: string | null;
  matchId: string;
  createdAt: Date;
  sender: {
    id: string;
    avatarUrl: string | null;
    fullName: string;
    state: string | null;
    country: string | null;
  };
}

export interface SentRequest {
  id: string;
  status: string;
  message: string | null;
  matchId: string;
  createdAt: Date;
  receiver: {
    id: string;
    avatarUrl: string | null;
    fullName: string;
    state: string | null;
    country: string | null;
  };
}

export interface BlockedUser {
  id: number;
  name: string;
  blockedOn: string;
  avatar: string;
}

export interface SettingsData {
  showOnlineStatus: boolean;
  showTravelingStatus: boolean;
  profileVisibilityCode: string;
  requestsFromCode: string;
  phone: string | null;
  isPhoneVerified: boolean;
}
export interface RequestData {
  id: string;
  senderId: string;
  receiverId: string;
}
export interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}
export type Step = "phone" | "otp";

export interface PhoneVerificationModalProps {
  onClose: () => void;
}


export type DocType = "passport" | "national_id" | "drivers_license";
export type UploadStep = "select_type" | "upload_front" | "upload_back" | "review" | "success";

export interface UploadedFile {
  file: File;
  preview: string;
  side: "front" | "back";
}

export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export const MAX_SIZE_MB = 10;


export interface UploadZoneProps {
  side: "front" | "back";
  file: UploadedFile | null;
  onFile: (file: File, side: "front" | "back") => void;
  onRemove: (side: "front" | "back") => void;
}


export interface DocumentUploadModalProps {
  onClose: () => void;
  onSuccess?: (docType: DocType) => void;
}