import { useQuery } from "@tanstack/react-query";
import { AnalyticsPeriod } from "../interfaces/interfaces";
import { AnalyticsServices } from "../services/service";

export function useAdminAnalytics(period: AnalyticsPeriod) {
  return useQuery({
    queryKey: ["admin_analytics", period],
    queryFn: () => AnalyticsServices.getAnalytics(period),
  });
}
