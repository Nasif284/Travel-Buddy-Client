"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminLogout } from "../features/auth/hooks/admin-auth.hooks";
import { useAuthStore } from "@/src/store/auth.store";
import { Icons } from "@/src/assets";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  // { href: "/admin/dashboard", label: "Dashboard", icon: <Icons.DashboardIcon /> },
  { href: "/admin/users", label: "All Users", icon: <Icons.GroupIcon /> },
  // { href: "/admin/trips", label: "All Trips", icon: <Icons.ExploreIcon /> },
  // { href: "/admin/reports", label: "Reports", icon: <Icons.AssessmentIcon /> },
  // { href: "/admin/analytics", label: "Analytics", icon: <Icons.MonitoringIcon /> },
  // { href: "/admin/admins", label: "Admins", icon: <Icons.AdminIcon /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const logout = useAdminLogout();
  const user = useAuthStore((state) => state.user);
  console.log(user)
  const handleLogout = () => {
    logout.mutate();
  };
  return (
    <aside className="w-60 h-screen fixed left-0 top-0 bg-[#1c1c1a] flex flex-col py-6 shadow-2xl z-50 overflow-hidden">
      {/* Brand + Identity */}
      <div className="px-6 mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-white uppercase tracking-tighter">Travel Buddy</span>
          <span className="px-2 py-0.5 bg-[#0f6e56] text-white text-[10px] font-bold rounded uppercase tracking-wider">Admin</span>
        </div>
        {/* Identity module */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-lg bg-[#0f6e56] flex items-center justify-center text-[#9aedcf] font-bold text-sm">AM</div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white leading-none">{user?.fullName}</span>
            <span className="text-[11px] text-stone-400 mt-1">Super Admin</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-1 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 ${isActive ? "border-l-4 border-[#0f6e56] text-[#0f6e56] bg-[#0f6e56]/10 font-bold pl-2" : "text-stone-400 hover:text-white hover:bg-stone-800/50"}`}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-3">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#ba1a1a] hover:bg-[#ba1a1a]/10 text-sm font-semibold tracking-tight transition-all duration-200 group">
          <span className="group-hover:translate-x-0.5 transition-transform">
            <Icons.LogoutIcon />
          </span>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
