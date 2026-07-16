"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useGetGroup } from "../hooks/trip.hooks";
const Icons = {
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  location: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
};
const GroupHeader = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetGroup(id as string);
  const group = data?.data;

  console.log(group);
  if (isLoading) {
    return (
      <section className="relative w-full h-[180px] rounded-xl overflow-hidden mb-8">
        <h2>Loading...</h2>
      </section>
    );
  }
  return (
    <section className="relative w-full h-[180px] rounded-xl overflow-hidden mb-8">
      <img src={group.coverUrl} alt="Bali Destination" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-1 font-headline">{group.name}</h1>
            <div className="flex gap-4 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-1">
                {Icons.calendar}{" "}
                {new Date(group.dateFrom).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}{" "}
                -{" "}
                {new Date(group.dateTo).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year:"2-digit"
                })}
              </span>
              <span className="flex items-center gap-1">{Icons.location} Bali, Indonesia</span>
            </div>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">Invite member {Icons.plus}</button>
        </div>
      </div>
    </section>
  );
};

export default GroupHeader;
