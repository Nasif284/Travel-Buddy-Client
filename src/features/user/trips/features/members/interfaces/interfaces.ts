import { Connection } from "@/src/features/user/matches-connections/interfaces/profile-listing.interface";

export type MemberRole = "admin" | "member";
export type OnlineStatus = "online" | "offline" | "traveling";

export interface TripMember {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  role: MemberRole;
  status: OnlineStatus;
  joinedDate: string;
  expenses: number;
  edits: number;
  isMe?: boolean;
}

export interface PendingInvite {
  id: number;
  identifier: string;
  initials?: string;
  invitedAgo: string;
  isEmail: boolean;
}

export const INITIAL_MEMBERS: TripMember[] = [
  {
    id: 1,
    name: "Alex Rivera (Me)",
    handle: "@alex_travels",
    role: "admin",
    status: "online",
    joinedDate: "Jun 1",
    expenses: 3,
    edits: 12,
    isMe: true,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ9rAZY_LwHj8wNBlE8zYsIif7XzmWhpz-X1ekXJxg19GiwaV1Kn7rXQZ8Zaw2YamlE9WWWcXvXicDv3yCo-uKVxT6i8Nk9zPHT-b5QCXvZHu6C7dhisM6uc7vvOIMC-5ioMDrMKHA33YCFtxESEibB512nBG0z0BnQimU_D3a_6KsICqXUCGrdDOOiOS-edeMykpa3HZaHPG-6Qen-EZtLIXFPCgPefMudUW26TFKyXMM_C6OBpRdwQJufPeiWM7Ib3gjJhXx5gw",
  },
  {
    id: 2,
    name: "Raj Patel",
    handle: "@raj_p",
    role: "member",
    status: "traveling",
    joinedDate: "Jun 1",
    expenses: 8,
    edits: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuByHmehBiFledBNngxMPz1t2wb4V-2el5iSnqyZG2QpdaJhYbJ_rzjC002aPN57U_j7Hl-R2tO2q029OyhDPyU3g-VwkGkHo5PGmJwRs8OU9EL-Fy2vJ8QYn00rySGmR6fh9K30YiTYv62RJW8fZP-aa-88HBEmU7ERaiR7y3wKIJZuiVBtu_xtfKzlHVTonOB8klHnBnNCIc4A4S5l7sM4wvXpXgldcMcKTMaY1yPEDMS1xPVL3-8-YIuaFA3pfKozZ1cllACH9p0",
  },
  {
    id: 3,
    name: "Ananya Singh",
    handle: "@ananya_s",
    role: "member",
    status: "offline",
    joinedDate: "Jun 1",
    expenses: 1,
    edits: 24,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwFT-aMj6qArX2ggE9SUjf0gTTX2oBDIj1F6tr4cC9eda2b83zNn7ziR-5Xnj65WL4Kdmyma8-uHS4iKMXbPvDDMSpea0UPMnAr4_g0TTqSyiU-Cj_O2sh8Kc9_FpVW0M1QHj489m_uMBUTXcVY5H_Xp2NTduV3MjTEPzY0fxc23iJnckqdDJeLGSbjdoP-xWYN1DDuEBmGcRVJakl4TpqAXlI2u5b4AE_J3zsnI608ogM-ZEoIhmgBx8doYwvmV6ZJTIC4ySaDCI",
  },
  {
    id: 4,
    name: "Vikram Roy",
    handle: "@v_roy",
    role: "member",
    status: "offline",
    joinedDate: "Jun 1",
    expenses: 0,
    edits: 2,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi0Igq8YbH-v0y7D2Ye0ncefwkcKWmJCf_S2yPGSVsVEZnoA2hhwApKMeStw31LEVbkWAK4Axj2rykcevUI0Z0JoBqiQd94NUWCLvJDnfaqFv9kmiNGkj54AimoPIDhyGKU1RbSf7S8fzqo_WeSHotch9MrwFayj4oXF7GqJP6rCDDVBdeBT1BJ5zsi1ZVdKMGDKASZ0r8ntEVXXe92ibOCBRomwY98znzp9GzdBe822_JSNxIESiTVDpWpeTAOi5zjpnhhjbi1Gk",
  },
];

export const INITIAL_INVITES: PendingInvite[] = [
  { id: 1, identifier: "priya.k@gmail.com", invitedAgo: "2 days ago", isEmail: true },
  { id: 2, identifier: "@johnny_doe", initials: "JD", invitedAgo: "2 days ago", isEmail: false },
];

export interface MemberMenuProps {
  member: Member;
  isCurrentUserAdmin: boolean;
  onPromote: () => void;
  onRemove: () => void;
  onClose: () => void;
}

export interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel: string;
  confirmClass: string;
  onConfirm: () => void;
  onCancel: () => void;

}
export interface Member {
  id: string;
  name: string;
  userId: string;
  avatarUrl: string;
  joinedAt: Date;
  role: string;
}
export interface GroupInvite {
  id: string;
  groupId: string;
  invitedBy: string;
  invitedUserEmail: string;
  statusCode: string;
  createdAt: Date
}