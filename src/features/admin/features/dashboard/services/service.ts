import { adminApi as api } from "@/src/lib/admin-api";
import { AdminAnalytics, AnalyticsPeriod } from "../interfaces/interfaces";

export const AnalyticsServices = {
  getAnalytics: async (period: AnalyticsPeriod): Promise<AdminAnalytics> => {
    const res = await api.get("/analytics", {
      params: {
        period,
      },
    });

    return res.data.data;
  },
};
