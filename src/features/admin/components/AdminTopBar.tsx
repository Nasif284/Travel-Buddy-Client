"use client";

import { useState } from "react";

const SearchIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);
const NotificationsIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

export default function AdminTopBar() {
  const [search, setSearch] = useState("");

  return (
    <header className="h-14 fixed top-0 right-0 left-60 z-10 bg-white/90 backdrop-blur-xl border-b border-stone-200/50 flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-bold text-[#1c1c1a]">User Directory</h1>

        {/* Search */}
        <div className="relative w-96 group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3f4944]">
            <SearchIcon />
          </span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users, trips, reports..." className="w-full bg-[#f6f3ef] border-none rounded-lg pl-9 pr-10 py-1.5 text-xs font-medium focus:ring-2 focus:ring-[#005440]/20 transition-all placeholder:text-stone-400 outline-none" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#e5e2de] rounded text-[10px] text-stone-500 font-bold border border-[#bec9c3]/20 pointer-events-none">⌘K</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-50 active:scale-90 transition-transform text-[#3f4944] relative">
          <NotificationsIcon />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-[#bec9c3]/30 mx-1" />

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-stone-50 transition-colors">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-[#1c1c1a] leading-tight">Arjun Menon</span>
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
