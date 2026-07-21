import { Member } from "../../members/interfaces/interfaces";

export type CategoryId = string;
export type Priority = "low" | "medium" | "high";

export interface ChecklistMember {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl: string | null;
}
export interface CheckItem {
  id: string;
  title: string;
  notes: string | null;

  isCompleted: boolean;

  priorityCode: string;
  categoryCode: string;

  assignee: ChecklistMember | null;

  createdBy: {
    id: string;
    fullName: string;
  };

  createdAt: Date;
  completedAt: Date | null;
}

export interface Category {
  code: string;
  name: string;
  completed: number;
  total: number;
}

export interface SquadMember {
  name: string;
  avatar: string;
  packed: number;
  total: number;
}

export interface TaskFormProps {
  id: string;
  taskId?:string,
  title: string;
  submitLabel: string;
  initialLabel?: string;
  initialCategory?: string;
  initialPriority?: Priority;
  initialAssignee?: string;
  initialNotes?: string;
  categories: Category[];
  members: Member[];
  isEdit:boolean
  onClose: () => void;
}

export const SQUAD_MEMBERS: SquadMember[] = [
  { name: "Sarah", packed: 8, total: 10, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNg8x8Z2JS6V3wrc0i9tGjwwH9TNnZuPLm9t6MaeqVgYGI4mvnrDlJNXiqL9ZND7Jc1LHQn0QmE6tkFfTjfBbrKEjp_SE0y8XYBCD1RtJpD4cJmZYVQ_FvIvPdTZaoZH6883ABb6e2dCfqG1VuZJp3CQxeWEmyKJmxyt1apY3CfMuKLwYFHquL93rDXPzx-78QJNfTtSWihy7OrdxxKPNAcpy_nXMflgPF6mxjFHo5ihDG4_GYPzhJ1zMMkc16l7lAdBXB-KVK18I" },
  { name: "Mike", packed: 4, total: 9, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkCwAFHiRE4jU84GMy_SmI0_ECmgQ1AfvlyLq515oz3uhQ53DqgktYG2Xi4vf9yz9Dz3YCeGqEQ51Jtd4gvhJ1wkRpoahn3UovB72NqkY3tKqnvoI7GD17qUCSoFL1iiIQg5tBlgvBb1Yh_xRtoq3iRCHcquN5QTSMt1R1bOV8J0_3R-Rqw2pg6WkRJPRXotJImA_fLTgIV6XISgenY_xKWsLWkmzn87xzijRZV2tBBjpSrWS4oRXPxm7H2Ds6UZLLk7sjxYd1Zak" },
  { name: "David", packed: 6, total: 12, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD41w3Rt3GPNPNHBG2QEnOj2mFR-j8dXHeETn8JLiKE3AHLM7h7QA4OKYUdvlgOg5ljQO4quokpUrGO1x1nJ1eQ6Xr2ht-aX_p4PiAHo9AHqulKBSYpQ4MAx6teNFnDFLTKnAcbRwVsEOGAEQ7iz88acOuxKB7k4PKtz0_kJAdd5y3-GojIO7IJIh6F1pMbt_j_453469PBOmA3wVk5UgD_ySLnUFswTp22ZieyC46fvfQQY8PeuZSsI6yuQYBoXVYXH3vtYpofo0" },
  { name: "Elena", packed: 4, total: 7, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOU2-0xQi4ojI4YkxsnHmFdHSayLdRrt4cyV8rE1f1E7nfV7j-W_wwYY3l4jwHcWRB174TYJmQQABzCRUZpi9cXyqSDJnv3yTI3kS8nONdsCvkBGHUxflXWnqZCVj8ehiZHO4OAsXknmq65xMIX6nSja3ZftDYIMT_1v0j7hLEpOHY64CIs7v9_VSnwIt5VLbs7VxMBG6ujYYJdzmn6j5Yz6-Q5w2lP70Ym7Iln40FA4PAgs529t-SR8JQWS6T1-eBAVqRAz9YsCE" },
];

export interface EditChecklistTask {
  title: string;
  categoryCode: string;
  priorityCode: string;
  assignedTo: string;
  notes?: string;
}


