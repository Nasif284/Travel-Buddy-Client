"use client";

import { useState } from "react";
import { Activity, ChecklistItem, Message } from "../interfaces/interface";
import ProgressBar from "../features/checklist/components/ProgressBar";
import { useGetGroup, useGetWeather } from "../hooks/trip.hooks";
import { useParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/src/utils/capitalizseFirstLetter";
import { useGetSummary } from "../features/expense/hooks/hooks";
import { useGetChecklist } from "../features/checklist/hooks/checklist.hooks";
import { WeatherIcon } from "../components/WeatherIcon";

const Icons = {
  arrowForward: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  chevronRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  clock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  pin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  sparkle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
  trendingDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  trendingUp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  cloudSun: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="8" r="2.8" />
      <line x1="16" y1="2.2" x2="16" y2="3.7" />
      <line x1="16" y1="12.3" x2="16" y2="13.8" />
      <line x1="21.8" y1="8" x2="20.3" y2="8" />
      <line x1="10.2" y1="8" x2="11.7" y2="8" />
      <line x1="20.6" y1="3.9" x2="19.5" y2="5" />
      <line x1="11.4" y1="12.1" x2="12.5" y2="11" />
      <line x1="20.6" y1="12.1" x2="19.5" y2="11" />
      <line x1="11.4" y1="3.9" x2="12.5" y2="5" />
      <path d="M6 19a4 4 0 0 1 0-8h.3A4.5 4.5 0 0 1 14 13.5a3 3 0 0 1-.5 5.5H6z" />
    </svg>
  ),
  droplets: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  wind: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  map: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};


export default function TripOverviewPage() {
  const { id } = useParams();

  const { data: weatherData, isLoading: weatherLoading } = useGetWeather(id as string)
  const weather = weatherData?.data

  const { data, isLoading } = useGetGroup(id as string);
  const trip = data?.data;

  const { data: checklistData, isLoading: checklistSummeryLoading } = useGetChecklist(id as string);
  const checkSummary = checklistData?.data?.summary;

  const { data: expenseSummery, isLoading: summeryLoading } = useGetSummary(id as string);
  const summary = expenseSummery?.data;


  if (isLoading || summeryLoading || checklistSummeryLoading) {
    return <h2>Loading....</h2>;
  }
  const checkPct = checkSummary?.total ? Math.round((checkSummary.completed * 100) / checkSummary.total) : 0;
  const days = new Date(trip.dateTo).getDate() - new Date(trip.dateFrom).getDate();
  const membersCount = trip.members.length;
  const GLANCE = [
    { label: "Duration", value: days },
    { label: "Group", value: membersCount },
    { label: "Budget Style", value: capitalizeFirstLetter(trip.budgetStyle) },
    { label: "Activities", value: "8 items" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      {/* ── Left column (60%) ──────────────────────────────── */}
      <div className="lg:col-span-6 space-y-10">
        {/* Trip at a glance */}
        <section>
          <h2 className="text-xl font-bold tracking-tight text-[#181d1a] mb-5 font-headline">Trip at a glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GLANCE.map(({ label, value }) => (
              <div key={label} className="bg-[#f1f4f1] p-4 rounded-xl">
                <span className="text-[#3f4944] text-xs uppercase tracking-widest font-bold">{label}</span>
                <p className="text-xl font-bold text-[#0f6e56] mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Expenses summary */}
        {summary.totalExpenses > 0 && (
          <div className="bg-[#f1f4f1] p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 font-headline">Expenses summary</h3>
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-[#3f4944]">Total Expense</span>
                <span>₹{summary.totalExpenses}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#ffdad6]/20 rounded-xl">
                <div className="flex items-center gap-2 text-[#ba1a1a]">
                  {Icons.trendingDown}
                  <span className="text-xs font-medium text-[#181d1a]">You owe total</span>
                </div>
                <span className="text-sm font-bold text-[#ba1a1a]">₹{summary.youOwe.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#c9eadb]/30 rounded-xl">
                <div className="flex items-center gap-2 text-[#005440]">
                  {Icons.trendingUp}
                  <span className="text-xs font-medium text-[#181d1a]">You gets back Total</span>
                </div>
                <span className="text-sm font-bold text-[#005440]">₹{summary.youAreOwed.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right column (40%) ─────────────────────────────── */}
      <div className="lg:col-span-4 space-y-8">
        {/* Weather */}
        <div className="bg-[#f1f4f1] p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg font-headline">Weather</h3>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-[#3f4944] uppercase tracking-widest">Real-time updates</span>
            </div>
          </div>

          {weatherLoading ? (
            <div className="text-center py-10 text-sm text-[#3f4944]">Loading weather...</div>
          ) : (
            <>
              {/* Current weather */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <WeatherIcon code={weather.current.weatherCode} isDay={weather.current.isDay} />

                  <div>
                    <p className="text-3xl font-extrabold text-[#181d1a]">{Math.round(weather.current.temperature)}°C</p>

                    <p className="text-sm font-medium text-[#3f4944]">{weather.current.weatherDescription}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-[#3f4944]">
                    H: {Math.round(weather.today.maxTemperature)}° · L: {Math.round(weather.today.minTemperature)}°
                  </p>

                  <p className="text-[10px] text-[#3f4944] opacity-70">
                    {weather.location.city}, {weather.location.country}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#e5e9e5]/50 p-3 rounded-xl">
                  <span className="text-[10px] font-bold text-[#3f4944] uppercase tracking-widest mb-1 block">Humidity</span>

                  <div className="flex items-center gap-2">
                    <span className="text-[#005440]">{Icons.droplets}</span>

                    <span className="text-sm font-bold">{weather.current.humidity}%</span>
                  </div>
                </div>

                <div className="bg-[#e5e9e5]/50 p-3 rounded-xl">
                  <span className="text-[10px] font-bold text-[#3f4944] uppercase tracking-widest mb-1 block">Wind</span>

                  <div className="flex items-center gap-2">
                    <span className="text-[#005440]">{Icons.wind}</span>

                    <span className="text-sm font-bold">{Math.round(weather.current.windSpeed)} km/h</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Shared checklist */}
        {checkSummary.total > 0 && (
          <div className="bg-[#f1f4f1] p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 font-headline">Shared checklist</h3>
            <div className="mb-5">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-[#3f4944]">Overall progress</span>
                <span>
                  {checkSummary.completed} of {checkSummary.total} tasks completed
                </span>
              </div>
              <ProgressBar pct={checkPct} color="bg-[#adcebf]" />
            </div>
          </div>
        )}

        {/* AI planner */}
        {/* <div className="bg-gradient-to-br from-[#0f6e56] to-[#005440] p-6 rounded-2xl text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">{Icons.sparkle}</div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded">AI Powered</span>
          </div>
          <h3 className="text-xl font-bold mb-2 font-headline">Refine your itinerary</h3>
          <p className="text-sm text-white/80 mb-6 leading-relaxed">Let AI suggest personalized activities based on your squad&apos;s interests and budget.</p>
          <button className="w-full bg-white text-[#005440] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#c9eadb] transition-colors">Generate plan {Icons.arrowForward}</button>
        </div> */}
      </div>
    </div>
  );
}
