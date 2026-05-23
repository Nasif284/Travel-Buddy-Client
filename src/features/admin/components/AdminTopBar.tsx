"use client";

import { Icons } from "@/src/assets";
import { useAuthStore } from "@/src/store/auth.store";
import { useState } from "react";



export default function AdminTopBar() {
  const [search, setSearch] = useState("");
  const user = useAuthStore((state) => state.user);
  return (
    <header className="h-14 fixed top-0 right-0 left-60 z-10 bg-white/90 backdrop-blur-xl border-b border-stone-200/50 flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-bold text-[#1c1c1a]">User Directory</h1>

        {/* <div className="relative w-96 group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3f4944]">
            <Icons.SearchIcon />
          </span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users, trips, reports..." className="w-full bg-[#f6f3ef] border-none rounded-lg pl-9 pr-10 py-1.5 text-xs font-medium focus:ring-2 focus:ring-[#005440]/20 transition-all placeholder:text-stone-400 outline-none" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#e5e2de] rounded text-[10px] text-stone-500 font-bold border border-[#bec9c3]/20 pointer-events-none">⌘K</div>
        </div> */}
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-50 active:scale-90 transition-transform text-[#3f4944] relative">
          <Icons.NotificationsIcon />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-[#bec9c3]/30 mx-1" />

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-stone-50 transition-colors">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-[#1c1c1a] leading-tight">{user?.fullName}</span>
            <span className="text-[10px] text-[#3f4944] leading-none">Super Admin</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e5e2de]">
            <img alt="Arjun Menon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5k67JcfTSiPd1eH5sTwB1EjZjrfV4NcC95QGGaNjiybWJlvRp6sq54Wul4ErhJrd7QKGPcpXuX6qzZqohzK0nfV75WMiIXTCHeKEoY_r--rQgz5GkCxvNCCwglQOpY_Cfa0WHayAS_gHZUbP_l1Z6Iim3Uq-TuyvoTpvc0i418ItfLJ5FUw59qxf_QGwecWLP1T_ZSEa2c1X-7qugBQELhVSud7HdGqQpaZIVT6TWGev_Stfc2Pu37roSmjnz-4I1kCLWr5n6prw" className="w-full h-full object-cover" />
          </div>
        </button>
      </div>
    </header>
  );
}
