"use client";

import { useState } from "react";
import { Icons } from "../assets";

export default function TopBar() {
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 right-80 left-64 h-20 bg-white/80 backdrop-blur-xl z-40 px-12 flex justify-between items-center border-b border-[#bec9c3]/15">
      <div className="flex items-center gap-4 bg-[#e0e3e0] rounded-full px-4 py-2 w-96">
        <span className="text-[#3f4944]">
          <Icons.SearchIconTop />
        </span>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search destinations or travelers..." className="bg-transparent border-none focus:ring-0 outline-none text-sm w-full placeholder:text-[#3f4944]/60 text-[#181d1a]" />
      </div>

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
