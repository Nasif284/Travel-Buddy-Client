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
  travelPersonalityCode?: string;
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
}
export interface RequestData {
  id: string;
  senderId: string;
  receiverId: string;
}