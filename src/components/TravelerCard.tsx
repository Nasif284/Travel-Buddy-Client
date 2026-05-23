"use client";

import { useState } from "react";
import type { Traveler } from "../types/types";
import { Icons } from "../assets";

export default function TravelerCard({ traveler }: { traveler: Traveler }) {
  const [requestSent, setRequestSent] = useState(traveler.requestSent ?? false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 shadow-sm">
      <div className="h-[200px] relative ">
        <img src={traveler.coverImage} alt={`${traveler.name}'s cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-[#005440]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">{traveler.matchPercent}% match</div>
        <div className="absolute bottom-0 left-6 translate-y-1/2 z-10">
          <div className="h-16 w-16 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
            <img src={traveler.avatarImage} alt={traveler.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="pt-10 px-6 pb-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#181d1a]">
            {traveler.name}, {traveler.age}
          </h2>
          <p className="text-xs text-[#3f4944] flex items-center gap-1 mt-0.5">
            <Icons.LocationIcon />
            {traveler.city}, {traveler.country}
          </p>
        </div>

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#c9eadb] text-[#4d6b5f] rounded-full text-xs font-bold mb-2">{traveler.badge}</span>
          <p className="text-xs text-[#3f4944] font-medium">
            {traveler.dates} • {traveler.budget}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {traveler.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase font-bold text-[#6f7a74] py-1 px-2 bg-[#ebefeb] rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3">
          <button className="flex-1 py-3 text-sm font-bold text-[#005440] hover:bg-[#e5e9e5] rounded-xl transition-colors">View profile</button>
          {requestSent ? (
            <button disabled className="flex-1 py-3 text-sm font-bold bg-[#e0e3e0] text-[#bec9c3] cursor-not-allowed rounded-xl flex items-center justify-center gap-2">
              <Icons.CheckIcon />
              Request sent
            </button>
          ) : (
            <button onClick={() => setRequestSent(true)} className="flex-1 py-3 text-sm font-bold bg-[#0f6e56] text-white rounded-xl hover:bg-[#005440] transition-all active:scale-95">
              Send request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
