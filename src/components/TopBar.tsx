"use client";
import Link from "next/link";
import { NotificationsIcon, TuneIcon } from "../assets/icons";
import { useGetMe } from "../features/user/matches-connections/hooks/users.hooks";
import { useSyncLocation } from "../hooks/syncLocation.hook";
import LocationBadge from "./LocationBadge";
import Avatar from "./Avatar";

export default function TopBar() {
  useSyncLocation();

  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-xl z-40 px-12 flex justify-between items-center border-b border-[#bec9c3]/15">
      <LocationBadge />
      <div className="flex items-center gap-6">
        <button className="hover:bg-[#f1f4f1] rounded-full p-2 transition-all active:scale-95 text-[#0F6E56]">
          <NotificationsIcon />
        </button>
        <Link href={"/settings"}>
          <button className="hover:bg-[#f1f4f1] rounded-full p-2 transition-all active:scale-95 text-[#0F6E56]">
            <TuneIcon />
          </button>
        </Link>
      <Avatar/>
      </div>
    </header>
  );
}
