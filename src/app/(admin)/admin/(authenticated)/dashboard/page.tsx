"use client";

import UserGrowthChart from "@/src/features/admin/features/dashboard/components/UserGrowthChart";
import { useAdminAnalytics } from "@/src/features/admin/features/dashboard/hooks/hook";
import { AnalyticsPeriod } from "@/src/features/admin/features/dashboard/interfaces/interfaces";
import { useState } from "react";


const PERIOD_OPTIONS: {
  value: AnalyticsPeriod;
  label: string;
}[] = [
  { value: "TODAY", label: "Last 24 hours" },
  { value: "LAST_7_DAYS", label: "Last 7 days" },
  { value: "LAST_30_DAYS", label: "Last 30 days" },
  { value: "LAST_3_MONTHS", label: "Last 3 months" },
  { value: "LAST_6_MONTHS", label: "Last 6 months" },
  { value: "LAST_YEAR", label: "Last 12 months" },
];

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("LAST_30_DAYS");

  const { data, isLoading, isError } = useAdminAnalytics(period);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-8 py-7">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1c1c1a]">Dashboard</h1>

          <p className="mt-1 text-sm text-stone-500">Overview of your Travel Buddy platform.</p>
        </div>

        <select value={period} onChange={(e) => setPeriod(e.target.value as AnalyticsPeriod)} className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#1c1c1a] shadow-sm outline-none transition focus:border-[#0f6e56] focus:ring-2 focus:ring-[#0f6e56]/10">
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-sm font-medium text-stone-500">Loading analytics...</div>
        </div>
      )}

      {/* Error */}
      {isError && <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">Failed to load analytics.</div>}

      {/* Dashboard */}
      {data && !isLoading && !isError && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard title="Total Users" value={data.users.total} newValue={data.users.newUsers} label="new users" />

            <SummaryCard title="Total Trips" value={data.trips.total} newValue={data.trips.newTrips} label="new trips" />

            <SummaryCard title="Active Trips" value={data.trips.activeTrips} />

            <SummaryCard title="Connections" value={data.connections.total} newValue={data.connections.newConnections} label="new connections" />
          </div>

          {/* User Growth */}
          {/* User Growth */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-bold">User Growth</h2>

              <p className="mt-1 text-xs text-stone-500">New users during the selected period.</p>
            </div>

            {data.users.growth.length === 0 ? <EmptyState /> : <UserGrowthChart data={data.users.growth} period={period} />}
          </section>

          {/* Acquisition + Location */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Acquisition */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-bold">User Acquisition</h2>

                <p className="mt-1 text-xs text-stone-500">Where users discovered Travel Buddy.</p>
              </div>

              <div className="space-y-4">
                {data.users.acquisition.length === 0 ? (
                  <EmptyState />
                ) : (
                  data.users.acquisition.map((item) => (
                    <div key={item.source}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium">{item.source}</span>

                        <span className="text-sm font-bold">{item.percentage}%</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full bg-[#0f6e56]"
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-bold">Users by Country</h2>

                <p className="mt-1 text-xs text-stone-500">User distribution by country.</p>
              </div>

              <div className="space-y-3">
                {data.users.byLocation.length === 0 ? (
                  <EmptyState />
                ) : (
                  data.users.byLocation.map((location) => (
                    <div key={location.countryCode} className="flex items-center justify-between rounded-xl bg-[#fcf9f5] px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold">{location.countryName}</p>

                        <p className="text-xs text-stone-500">{location.countryCode}</p>
                      </div>

                      <span className="text-lg font-bold">{location.count}</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Trips + Verification */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Top destinations */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="mb-5">
                <h2 className="text-base font-bold">Top Trip Destinations</h2>

                <p className="mt-1 text-xs text-stone-500">Most popular destinations during the selected period.</p>
              </div>

              <div className="space-y-3">
                {data.trips.topDestinations.length === 0 ? (
                  <EmptyState />
                ) : (
                  data.trips.topDestinations.map((destination, index) => (
                    <div key={destination.destinationId} className="flex items-center justify-between rounded-xl bg-[#fcf9f5] px-4 py-3">
                      <div className="flex items-center gap-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f6e56]/10 text-sm font-bold text-[#0f6e56]">{index + 1}</span>

                        <span className="text-sm font-semibold">{destination.name}</span>
                      </div>

                      <span className="text-sm font-bold">{destination.count}</span>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Verification */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold">Verifications</h2>

              <p className="mt-1 text-xs text-stone-500">Verification requests requiring attention.</p>

              <div className="mt-8">
                <p className="text-5xl font-black tracking-tight">{data.verifications.pending}</p>

                <p className="mt-2 text-sm text-stone-500">Pending verifications</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, newValue, label }: { title: string; value: number; newValue?: number; label?: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{title}</p>

      <p className="mt-3 text-3xl font-black tracking-tight text-[#1c1c1a]">{value.toLocaleString()}</p>

      {newValue !== undefined && (
        <p className="mt-2 text-xs font-medium text-[#0f6e56]">
          +{newValue.toLocaleString()} {label}
        </p>
      )}
    </div>
  );
}

function EmptyState() {
  return <div className="py-8 text-center text-sm text-stone-400">No data for this period.</div>;
}
