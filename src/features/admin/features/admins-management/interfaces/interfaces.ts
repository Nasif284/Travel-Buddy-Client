export type Role = "Super Admin" | "Moderator" | "Analyst";
export type Status = "Active" | "Suspended" | "Deactivated" 
export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastActive: string;
  ip: string;
}
export const ROLE_INFO: {
  label: Role;
  title: string;
  description: string;
  badgeClass: string;
  icon: string;
  iconClass: string;
}[] = [
  {
    label: "Super Admin",
    title: "Unrestricted access",
    description: "Full control over billing, admins, integrations and platform data.",
    badgeClass: "bg-emerald-100 text-emerald-800",
    icon: "M12 2.25 4.5 5.25v6c0 5 3.2 8.6 7.5 10.5 4.3-1.9 7.5-5.5 7.5-10.5v-6L12 2.25Z",
    iconClass: "w-5 h-5 text-[#0f6e56]",
  },
  {
    label: "Moderator",
    title: "Content & user support",
    description: "Manage reports, review content and handle basic user support tasks.",
    badgeClass: "bg-amber-100 text-amber-800",
    icon: "M16.862 4.487 18.75 2.6a2.121 2.121 0 0 1 3 3l-1.887 1.887M16.862 4.487 5.6 15.75 3 21l5.25-2.6L19.5 7.65l-2.638-3.163Z",
    iconClass: "w-5 h-5 text-amber-600",
  },
  {
    label: "Analyst",
    title: "Read-only analytics",
    description: "View dashboards and export financial and performance logs.",
    badgeClass: "bg-stone-200 text-stone-700",
    icon: "M3 3v18h18M7 15l3-4 3 3 5-7",
    iconClass: "w-5 h-5 text-stone-500",
  },
];
export const ROLE_BADGE_CLASS: Record<Role, string> = {
  "Super Admin": "bg-emerald-100 text-emerald-800",
  Moderator: "bg-amber-100 text-amber-800",
  Analyst: "bg-stone-200 text-stone-700",
};

export const icons = {
  add: "M12 4.5v15m7.5-7.5h-15",
  personAdd: "M18 7.5v6m3-3h-6M8.25 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.25 19.5a6 6 0 0 1 11.14-3.14",
  close: "M6 18 18 6M6 6l12 12",
  checkCircle: "M9 12.75 11.25 15 15 9.75m-3-6.75a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  info: "M11.25 11.25h.75v4.5h.75M12 7.5h.008v.008H12V7.5Zm9 4.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  eye: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z",
};

