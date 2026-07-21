import { userApi as api } from "@/src/lib/api-client";
import { CreateExpenseRequestDTO } from "../interface/interface";

export const expenseServices = {
  createExpense: async (groupId: string, data: CreateExpenseRequestDTO) => {
    const res = await api.post(`/trip/group/${groupId}/expenses`, data);
    return res.data;
  },

  getExpenses: async (groupId: string) => {
    const res = await api.get(`/trip/group/${groupId}/expenses`);
    return res.data;
  },

  updateExpense: async (groupId: string, expenseId: string, data: unknown) => {
    const res = await api.patch(`/trip/group/${groupId}/expenses/${expenseId}`, data);
    return res.data;
  },

  deleteExpense: async (groupId: string, expenseId: string) => {
    const res = await api.delete(`/trip/group/${groupId}/expenses/${expenseId}`);
    return res.data;
  },

  getSummary: async (groupId: string) => {
    const res = await api.get(`/trip/group/${groupId}/expenses/summery`);
    return res.data;
  },

  getBalances: async (groupId: string, mode: "ORIGINAL" | "SIMPLIFIED") => {
    const res = await api.get(`/trip/group/${groupId}/expenses/balances`, {
      params: { mode },
    });
    return res.data;
  },

  getReport: async (groupId: string) => {
    const res = await api.get(`/trip/group/${groupId}/expenses/report`);
    return res.data;
  },

  createSettlement: async (groupId: string, data: unknown) => {
    const res = await api.post(`/trip/group/${groupId}/expenses/settle`, data);
    return res.data;
  },
};
