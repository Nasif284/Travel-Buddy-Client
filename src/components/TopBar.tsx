"use client";

import { Icons } from "../assets";
import { useSyncLocation } from "../hooks/syncLocation.hook";
import LocationBadge from "./LocationBadge";

export default function TopBar() {
  useSyncLocation();
  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-xl z-40 px-12 flex justify-between items-center border-b border-[#bec9c3]/15">
      <LocationBadge />
      <div className="flex items-center gap-6">
        <button className="hover:bg-[#f1f4f1] rounded-full p-2 transition-all active:scale-95 text-[#0F6E56]">
          <Icons.NotificationsIcon />
        </button>
        <button className="hover:bg-[#f1f4f1] rounded-full p-2 transition-all active:scale-95 text-[#0F6E56]">
          <Icons.TuneIcon />
        </button>
        <div className="h-10 w-10 rounded-full bg-[#0f6e56] flex items-center justify-center text-white font-bold text-sm">JD</div>
      </div>
    </header>
  );
}
