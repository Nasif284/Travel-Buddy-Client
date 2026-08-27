export type AnalyticsPeriod = "TODAY" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_3_MONTHS" | "LAST_6_MONTHS" | "LAST_YEAR";

export interface AnalyticsGrowth {
  period: string;
  count: number;
}

export interface UserAcquisition {
  source: string;
  count: number;
  percentage: number;
}

export interface UsersByLocation {
  countryCode: string;
  countryName: string;
  count: number;
}

export interface TopTripDestination {
  destinationId: string;
  name: string;
  count: number;
}

export interface AdminAnalytics {
  period: AnalyticsPeriod;

  users: {
    total: number;
    newUsers: number;
    growth: AnalyticsGrowth[];
    acquisition: UserAcquisition[];
    byLocation: UsersByLocation[];
  };

  trips: {
    total: number;
    newTrips: number;
    activeTrips: number;
    topDestinations: TopTripDestination[];
  };

  connections: {
    total: number;
    newConnections: number;
  };

  verifications: {
    pending: number;
  };
}
