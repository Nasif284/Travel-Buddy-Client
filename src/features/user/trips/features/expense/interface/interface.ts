import { Member } from "../../members/interfaces/interfaces";

export type ExpenseTransactionType = "PAY" | "RECEIVE";
export type ExpenseBalanceStatus = "OWES" | "GET_BACK" | "SETTLED";

export interface ExpenseBalanceTransactionDTO {
  memberId: string;
  fullName: string;
  avatarUrl?: string | null;
  amount: number;
  type: ExpenseTransactionType;
}

export interface ExpenseBalanceMemberDTO {
  memberId: string;
  fullName: string;
  avatarUrl?: string | null;
  paid: number;
  owes: number;
  balance: number;
  status: ExpenseBalanceStatus;
  transactions: ExpenseBalanceTransactionDTO[];
}

export interface GetExpenseBalancesResponseDTO {
  members: ExpenseBalanceMemberDTO[];
}

export const DUMMY_BALANCES: GetExpenseBalancesResponseDTO = {
  members: [
    {
      memberId: "rohan",
      fullName: "Rohan Nair",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsaeYTQzK4frHfXRi5kOR7AVeg_844PpmUSTW_YAy4dzkORM9QOHxEGFcn8VSLBuTCE6sHFnexhXP4C1-HiQIKKfTIQ-eDy3Fer_a5v0-oUeGEJ3bwD20G5kQT68RWX_c0XHgySFJG7ozoFIWgobcyJBKvO7l4tKO-5LlHlbpckdx1CvgYh_qI51Lk2_DUkdrmvv_BKnvSouH0_UTD2oM6OP4M4Vq0H31LbKYLa12gAIcMOzl3U4wFze21kmo0GTTNEX9pCO3BjAY",
      paid: 8000,
      owes: 12250,
      balance: -4250,
      status: "OWES",
      transactions: [
        { memberId: "priya", fullName: "Priya Patel", avatarUrl: null, amount: 3000, type: "PAY" },
        { memberId: "amit", fullName: "Amit Mishra", avatarUrl: null, amount: 1250, type: "PAY" },
      ],
    },
    {
      memberId: "priya",
      fullName: "Priya Patel",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1x-tI0ub1XmK9NDZrGJE9dNtPbl2RUs6T2y7K9g1ti44gPgfmLS0N3S353H-GDwoDtFVsEwM9W5KpZZti6Q8cmvoDSad-Nk-k2esenfUthYsL6bI_Zsdz4zA4U6WBL3rZYHNo8G0OhHhSOUVQWMO87CTHvAyCmt9CygcxEoIFezh2tE47-aHhZAEmNJe9yZgs--cTUmDsqPyYp2PZnZALjPFKtRc48DjXc9kL4ZhggJV9Qf-i0lBnzwD_qCmt9ehPzFwmb9EkCLg",
      paid: 18000,
      owes: 12600,
      balance: 5400,
      status: "GET_BACK",
      transactions: [
        { memberId: "rohan", fullName: "Rohan Nair", avatarUrl: null, amount: 3000, type: "RECEIVE" },
        { memberId: "amit", fullName: "Amit Mishra", avatarUrl: null, amount: 2400, type: "RECEIVE" },
      ],
    },
    {
      memberId: "amit",
      fullName: "Amit Mishra",
      avatarUrl: null,
      paid: 7500,
      owes: 8750,
      balance: -1250,
      status: "OWES",
      transactions: [
        { memberId: "priya", fullName: "Priya Patel", avatarUrl: null, amount: 2400, type: "PAY" },
        { memberId: "rohan", fullName: "Rohan Nair", avatarUrl: null, amount: 1150, type: "RECEIVE" },
      ],
    },
    {
      memberId: "ananya",
      fullName: "Ananya Rao",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsaeYTQzK4frHfXRi5kOR7AVeg_844PpmUSTW_YAy4dzkORM9QOHxEGFcn8VSLBuTCE6sHFnexhXP4C1-HiQIKKfTIQ-eDy3Fer_a5v0-oUeGEJ3bwD20G5kQT68RWX_c0XHgySFJG7ozoFIWgobcyJBKvO7l4tKO-5LlHlbpckdx1CvgYh_qI51Lk2_DUkdrmvv_BKnvSouH0_UTD2oM6OP4M4Vq0H31LbKYLa12gAIcMOzl3U4wFze21kmo0GTTNEX9pCO3BjAY",
      paid: 9350,
      owes: 9350,
      balance: 0,
      status: "SETTLED",
      transactions: [],
    },
  ],
};

export const CURRENT_USER_ID = "rohan";

export interface ExpenseRowProps {
  expense: ExpenseResponseDTO;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ExpenseModalProps {
  id: string;
  mode: "add" | "edit";
  initial?: ExpenseResponseDTO;
  onClose: () => void;
    members: Member[];
    expenseId?:string
}

export interface ExpenseFormState {
  title: string;
  amount: string;
  date: string;
  category: CategoryCode;
  paidById: string;
  splitMethod: SplitCode;
  splits: Record<string, string>;
}

export interface ExpenseParticipantResponseDTO {
  memberId: string;
  name: string;
  amount: number;
  percentage: number | null;
  shares: number | null;
}

export interface ExpenseResponseDTO {
  id: string;
  title: string;
  description?: string | null;
  amount: number;
  expenseDate: Date;
  category: { code: string; name: string };
  splitMethod: { code: string; name: string };
  paidBy: { id: string; name: string };
  participants: ExpenseParticipantResponseDTO[];
}

export interface GetExpensesResponseDTO {
  expenses: ExpenseResponseDTO[];
}

export type CategoryCode = "ACCOMMODATION" | "FOOD" | "TRANSPORT" | "ACTIVITIES" | "SHOPPING" | "TICKETS" | "ENTERTAINMENT" | "MEDICAL" | "OTHERS";
export interface CatConfig {
  icon: React.ReactNode;
  bg: string;
  text: string;
  bar: string;
  label: string;
}

export type SplitCode = "EQUAL" | "PERCENTAGE" | "CUSTOM" | "SHARES";
export interface SquadMember {
  id: string;
  name: string;
  avatar: string;
}

export const SQUAD_MEMBERS: SquadMember[] = [
  { id: "me", name: "Me", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQVZWRUdsGmzZf5u3jwJ30lsqt2u6mX82Nwyr9uhD12is9E3t7g3ISxCLV-e_ZAhpjSnBD8_i9-fK6M6FGOPgNmIsaA1Xhe4uaOT5B8kWVmgDG8WRSaLr6bcb4R1-rDfRosNtoX0vmASVnV0BpwaqCDgOZJNRxLlSSc5PvLTNf1nsSKDWnI8HijG58K5aN_eANZy-sQc1gz7n1B_a_FeyRJz2UaJ4I_rQ2_NJWthBi0FdNPRMjDBpQRqJ8TZ97y6dKeq4zHQVugSw" },
  { id: "raj", name: "Raj", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqAXGYn1_UPROaau2GVi9lUeYYC4CctfQXCbzyWNxCA69zibZZvhWH7WWMrf6VL7eygOBtPfxzZHVj43M0EQDVz4V62p7i6EOXcmmYo3KAJV_yDMLiNRgO_IfHYZhftA6poAtyWNeTiBBPbtd3S23gS8GhW2nUansLuUnudZT21S4_v1W62RkDgbfreLf2YsMXDZP55-X1JICnhlfN6qNAHgQyhNMC2WjE4bQ6EVpd3qg78EovHHviV8LkBYvSDPykSEQ_wpRDXrs" },
  { id: "ananya", name: "Ananya", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXI7QAVPj20Uk4LfceY4w_cJWeBhoL_QHLEsNtrnF81G56V3WaJqzGW5K14pgKpbTbwbw7ngbealHbUbhLz7cfl0lokRB1loFCko3bGcSHKiJYjrjTA6ncHLCm2dDHrXCjio-OUCahINAE2deENtrCaKbsE3vyQ8PgfFaodxbglgDbKDxnZYv0NO8bzhtpz55XIHEdFsxZ7aQ0y_3vzV9wLTHLNleyHZoiZdOHDvU3MP5cMMj0EaTNQxuoVYtWxB-svXgtOn9fF6Y" },
  { id: "vikram", name: "Vikram", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5onfu7xeYIvWVHXgzGhXwE0j9ODP5wQT8-kFxCMOC0Jo4pSKVoWFpgmUfuPVFpm-CnF1mtoOdal_VTUnikNEj8ZaIekteTcS1nZBDuecWFzxzCcDvvVQc9Tiq6jThGt7O43Qy3Pql1UZ4CzS7yvFoilOYnzi4iF57Oymd-Spti1koqoIfx9Z0C5-j_w4vyiOJwE_eVOtlyB8zNCVmQMIOz3_dfuJkBGRfAGuKR_BJas52p7EYFqpIumEet03dt2VBznvt3N3M4rM" },
];

export interface ExpenseParticipantDTO {
  memberId: string;
  percentage?: number;
  amount?: number;
  shares?: number;
}

export interface CreateExpenseRequestDTO {
  title: string;
  description?: string;
  amount: number;
  categoryCode: string;
  splitMethodCode: string;
  paidById: string;
  participants: ExpenseParticipantDTO[];
}

export interface SplitPreviewProps {
  method: SplitCode;
  totalAmount: number;
  participants: { memberId: string; value: string }[];
}
export interface GetExpenseSummaryResponseDTO {
  totalExpenses: number;
  youPaid: number;
  youOwe: number;
  youAreOwed: number;
  netBalance: number;
}

export interface ExpenseBalanceMemberDTO {
  memberId: string;
  fullName: string;
  avatarUrl?: string | null;
  paid: number;
  owes: number;
  balance: number;
  status: ExpenseBalanceStatus;
  transactions: ExpenseBalanceTransactionDTO[];
}

export interface ExpenseOverallReportDTO {
  totalExpenseAmount: number;
  averageExpensePerMember: number;
}

export interface ExpenseCategoryReportDTO {
  category: string;
  totalAmount: number;
  percentage: number;
}

export interface ExpenseMemberReportDTO {
  memberId: string;
  fullName: string;
  avatarUrl?: string | null;
  paid: number;
  owes: number;
  balance: number;
}

export interface ExpenseReportResponseDTO {
  overall: ExpenseOverallReportDTO;
  categories: ExpenseCategoryReportDTO[];
  members: ExpenseMemberReportDTO[];
}

