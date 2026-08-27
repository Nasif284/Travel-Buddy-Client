"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsPeriod } from "../interfaces/interfaces";

interface UserGrowthData {
  period: string;
  count: number;
}
interface UserGrowthChartProps {
  data: UserGrowthData[];
  period: AnalyticsPeriod;
}

export default function UserGrowthChart({ data, period }: UserGrowthChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    date: formatPeriod(item.period, period),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />

          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#78716c", fontSize: 11 }} />

          <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={35} tick={{ fill: "#78716c", fontSize: 11 }} />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e7e5e4",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            labelStyle={{
              fontWeight: 600,
              color: "#1c1c1a",
            }}
          />

          <Line
            type="monotone"
            dataKey="count"
            name="New users"
            stroke="#0f6e56"
            strokeWidth={3}
            dot={{
              r: 3,
              fill: "#0f6e56",
            }}
            activeDot={{
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatPeriod(period: string, analyticsPeriod: AnalyticsPeriod): string {
  const date = new Date(period);

  if (analyticsPeriod === "TODAY") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(date);
  }

  if (analyticsPeriod === "LAST_6_MONTHS" || analyticsPeriod === "LAST_YEAR") {
    return new Intl.DateTimeFormat("en", {
      month: "short",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}
