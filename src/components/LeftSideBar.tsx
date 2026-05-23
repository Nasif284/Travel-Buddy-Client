"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "../features/user/auth/hooks/auth.hooks";
import { Icons } from "../assets";

type NavItem = { href: string; label: string; icon: React.ReactNode };


const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: <Icons.HomeIcon /> },
  { href: "/matches", label: "Matches", icon: <Icons.HeartIcon /> },
  { href: "/trips", label: "Trips", icon: <Icons.ExploreIcon /> },
  { href: "/messages", label: "Messages", icon: <Icons.ChatIcon /> },
  { href: "/profile", label: "Profile", icon: <Icons.PersonIcon /> },
  { href: "/settings", label: "Settings", icon: <Icons.SettingsIcon /> },
];

export default function LeftSidebar() {
  const pathname = usePathname();
    const logout = useLogout()
    const handleLogout = () => {
        logout.mutate()
    }
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#f1f4f1] flex flex-col py-8 px-6 z-50">
      <div className="text-2xl font-black text-[#0F6E56] mb-8 font-headline">Travel Buddy</div>

      <div className="mb-2">
        <p className="font-headline font-bold text-xs text-[#0F6E56] opacity-60 uppercase tracking-widest mb-4">Main Menu</p>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 py-3 px-4 rounded-lg font-headline font-bold text-sm tracking-tight transition-all active:scale-[0.98] ${active ? "text-[#0F6E56] border-r-4 border-[#0F6E56] bg-white/50" : "text-[#181d1a] opacity-70 hover:bg-[#e0e3e0]"}`}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto">
        <button onClick={handleLogout} className="w-full bg-[#0f6e56] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-[#005440]">
                  Logout
        </button>
      </div>
    </aside>
  );
}
