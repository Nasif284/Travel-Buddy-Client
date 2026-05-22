"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminLogout } from "../features/auth/hooks/admin-auth.hooks";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};


const DashboardIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);
const GroupIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);
const ExploreIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
  </svg>
);
const AssessmentIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
);
const MonitoringIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
  </svg>
);
const AdminIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z" />
  </svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/admin/users", label: "All Users", icon: <GroupIcon /> },
  { href: "/admin/trips", label: "All Trips", icon: <ExploreIcon /> },
  { href: "/admin/reports", label: "Reports", icon: <AssessmentIcon /> },
  { href: "/admin/analytics", label: "Analytics", icon: <MonitoringIcon /> },
  { href: "/admin/admins", label: "Admins", icon: <AdminIcon /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const logout = useAdminLogout();
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
            <span className="text-sm font-semibold text-white leading-none">Arjun Menon</span>
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

      {/* Sign out */}
      <div className="mt-auto px-3">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#ba1a1a] hover:bg-[#ba1a1a]/10 text-sm font-semibold tracking-tight transition-all duration-200 group">
          <span className="group-hover:translate-x-0.5 transition-transform">
            <LogoutIcon />
          </span>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
