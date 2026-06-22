"use client";
import { useEffect, useMemo, useState } from "react";
import { BlockedUser, SettingsData } from "../interfaces/profile.interface";
import Toggle from "../components/Toggle";
import ResetPasswordModal from "../components/ResetPasswordModal";
import { useGetSettings, useUpdateSettings } from "../hooks/profile.hooks";
import { useDebounce } from "@/src/hooks/debounce.hook";
const INITIAL_BLOCKED: BlockedUser[] = [
  {
    id: 1,
    name: "Jason V.",
    blockedOn: "Blocked on Mar 12, 2024",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC91ZzDGGCbp-b6BHp_ZjD3cwo83TgLOYLZs1kqNzMldAs3D9OZaaQPUt9IBohcR6FM8arMc5lKBJI0Ktr1oDxFXNVtHSLjOAgIkbz7SUByEn3GnFKtIK6Wfvk1B3QgXEK3r_qCACbgFw2EMdXoYwQqSUf3DAiJANXiaG4FdDVTjf1O15Q2MrDK7OgNM4NwFw0wyycpRunWgtX7fsT5KfmR0dD-K65_MD5-Hz0VMZdy3h20T4x5Yei1dtEiHgYu23EGQ8sZVe1-LXc",
  },
  {
    id: 2,
    name: "Elena K.",
    blockedOn: "Blocked on Jan 05, 2024",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHeR5MaMrgzNa9BdpCjZPzbDgl_wo1JL-L-7XGoHbOdSP34lDipUCdLwgTJY7XjIO0P6tIW9eD1DFobBxVy16VZkbsX9n4KUyV_n9Ep18y09xVJ6kD0IIz_79lTcRP3t2DGLwfGufxOn_s3PTlmF6JeQ99BMR-2MLj2iaBLnG2bYr3EI3KptcdXZvBgoJXoCTT_t9oITW-I6Kb-P47Rvzg5o7arPXgiYdHvoOEPUVkY00Il3MZ8t-00tkLYwDOe_5_aAFEM5u6ZYs",
  },
];
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`bg-white p-6 rounded-2xl border border-[#bec9c3]/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ${className}`}>{children}</section>;
}

export default function SettingsPage() {
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const { data, isLoading } = useGetSettings();
  const update = useUpdateSettings();
  const initialSettings = data?.data;
    const [settings, setSettings] = useState<SettingsData>({
        profileVisibilityCode: "",
        requestsFromCode: "",
        showOnlineStatus: true,
        showTravelingStatus:true
  });
  useEffect(() => {
    if (data?.data) {
      setSettings(data.data);
    }
  }, [data]);

  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(INITIAL_BLOCKED);
  const [reportQuery, setReportQuery] = useState("");

  const hasSettingsChanges = useMemo(() => {
    if (!settings || !initialSettings) return false;
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);
 const handleSave = () => {
   update.mutate(settings);
 };
  function handleUnblock(id: number) {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function handleDeactivate() {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      // call API
    }
  }

  function handleDelete() {
    if (window.confirm("This action is permanent. Are you absolutely sure you want to delete your account?")) {
      // call API
    }
    }
    if (isLoading) {
        return       <main className="ml-64 mt-20 min-h-screen pb-32"><h1>Loading..</h1></main>
    }

  return (
    <>
      {hasSettingsChanges && (
        <div
          className="
      fixed
      bottom-6
      right-6
      z-50
      flex
      items-center
      gap-4
      px-5
      py-4
      bg-white
      rounded-2xl
      shadow-xl
      border
      border-[#bec9c3]/20
    "
        >
          <span className="text-sm font-medium text-[#3f4944]">You have unsaved changes</span>

          <button
            onClick={() => setSettings(initialSettings!)}
            className="
        px-4
        py-2
        rounded-lg
        border
        border-[#bec9c3]
        text-sm
        font-semibold
      "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={update.isPending}
            className="
        px-5
        py-2
        rounded-lg
        bg-[#0f6e56]
        text-white
        font-bold
        disabled:opacity-50
      "
          >
            {update.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
      <main className="ml-64 mt-20 min-h-screen pb-32">
        <div className="p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* ── Verification Status ───────────────────────────────── */}
            <Card>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 font-headline">
                <span className="text-[#005440]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </span>
                Verification Status
              </h2>
              <div className="flex flex-wrap items-center gap-10">
                {/* Phone verified */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0f6e56]/10 flex items-center justify-center text-[#005440]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.19 6.19l.95-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#005440] flex items-center gap-1">
                      Phone verified
                      <span className="text-[#005440]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </span>
                    </p>
                    <p className="text-xs text-[#3f4944]">+1 ••• ••• 42</p>
                  </div>
                </div>

                {/* ID not verified */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-500">ID not verified</p>
                    <a href="#" className="text-xs text-[#005440] font-semibold hover:underline">
                      Verify now
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* ── Privacy Controls ──────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-lg font-bold mb-6 font-headline">Privacy controls</h2>
                <div className="space-y-5">
                  {/* Who can see profile */}
                  <div>
                    <label className="block text-xs font-bold text-[#3f4944] mb-2 px-1">Who can see my profile</label>
                    <select value={settings.profileVisibilityCode} onChange={(e) => setSettings((prev) => ({ ...prev, profileVisibilityCode: e.target.value }))} className="w-full h-12 px-4 rounded-xl border-none bg-[#e0e3e0] text-sm font-medium focus:ring-2 focus:ring-[#005440]/20 outline-none cursor-pointer text-[#181d1a]">
                      <option value={"connected only"}>Connected Only</option>
                      <option value={"verified only"}>Verified Only</option>
                      <option value={"everyone"}>Everyone</option>
                    </select>
                  </div>

                  {/* Allow requests from */}
                  <div>
                    <label className="block text-xs font-bold text-[#3f4944] mb-2 px-1">Allow buddy requests from</label>
                    <select value={settings.requestsFromCode} onChange={(e) => setSettings((prev) => ({ ...prev, requestsFromCode: e.target.value }))} className="w-full h-12 px-4 rounded-xl border-none bg-[#e0e3e0] text-sm font-medium focus:ring-2 focus:ring-[#005440]/20 outline-none cursor-pointer text-[#181d1a]">
                      <option value={"everyone"}>Everyone</option>
                      <option value={"verified only"}>Verified Only</option>
                      <option value={"nobody"}>Nobody</option>
                    </select>
                  </div>

                  {/* Toggle: Online status */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Show online status</span>
                    <Toggle enabled={settings.showOnlineStatus} onChange={(status) => setSettings((prev) => ({ ...prev, showOnlineStatus: status }))} />
                  </div>

                  {/* Toggle: Currently traveling */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show currently traveling</span>
                    <Toggle enabled={settings.showTravelingStatus} onChange={(status) => setSettings((prev) => ({ ...prev, showTravelingStatus: status }))} />
                  </div>
                </div>
              </Card>

              {/* ── Security ──────────────────────────────────────── */}
            </div>
            <Card>
              <div className="mb-6">
                <h2 className="text-lg font-bold font-headline">Security</h2>
                <p className="text-xs text-[#3f4944] mt-1">Manage your account security and password.</p>
              </div>
              <div className="flex items-center justify-between py-4 border-t border-[#bec9c3]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0f6e56]/10 flex items-center justify-center text-[#005440]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Password</p>
                    <p className="text-[10px] text-[#3f4944]">Last changed 3 months ago</p>
                  </div>
                </div>
                <button onClick={() => setShowResetPasswordModal(true)} className="px-4 py-2 text-xs font-bold text-[#005440] border border-[#005440]/30 hover:bg-[#0f6e56]/5 rounded-lg transition-colors">
                  Reset Password
                </button>
              </div>
            </Card>
            {/* ── Blocked Users ─────────────────────────────────────── */}
            {/* <Card>
              <h2 className="text-lg font-bold mb-6 font-headline">Blocked users</h2>
              {blockedUsers.length === 0 ? (
                <p className="text-sm text-[#3f4944] py-4">No blocked users.</p>
              ) : (
                <div className="divide-y divide-[#bec9c3]/10">
                  {blockedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-bold">{user.name}</p>
                          <p className="text-[10px] text-[#3f4944]">{user.blockedOn}</p>
                        </div>
                      </div>
                      <button onClick={() => handleUnblock(user.id)} className="px-4 py-2 text-xs font-bold text-[#005440] bg-[#0f6e56]/10 hover:bg-[#0f6e56]/20 rounded-lg transition-colors">
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card> */}

            {/* ── Reporting ─────────────────────────────────────────── */}
            {/* <Card>
              <h2 className="text-lg font-bold mb-6 font-headline">Reporting</h2>
              <div className="space-y-6">
                <div className="max-w-xl">
                  <h3 className="text-sm font-bold mb-2">Report a user</h3>
                  <p className="text-xs text-[#3f4944] mb-4">If you&apos;ve had a negative experience with someone, let us know. We take safety seriously.</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                      {" "}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </span>
                    <input type="text" value={reportQuery} onChange={(e) => setReportQuery(e.target.value)} placeholder="Search for a user to report..." className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#bec9c3]/30 bg-[#f1f4f1] text-sm focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] outline-none transition-all text-[#181d1a] placeholder:text-[#3f4944]/60" />
                  </div>
                </div>

                <div className="w-full max-w-md bg-[#f1f4f1] p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e0e3e0] rounded-full flex items-center justify-center text-stone-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                        <line x1="4" y1="22" x2="4" y2="15" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold">Your reports</p>
                      <p className="text-[10px] text-[#3f4944]">0 active reports</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#3f4944] hover:text-[#005440] underline transition-colors">View history</button>
                </div>
              </div>
            </Card> */}

            {/* ── Danger Zone ───────────────────────────────────────── */}
            <section className="bg-red-50/50 p-6 rounded-2xl border border-[#ba1a1a]/10">
              <h2 className="text-lg font-bold text-[#ba1a1a] mb-2 font-headline">Danger Zone</h2>
              <p className="text-xs text-stone-500 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={handleDeactivate} className="px-6 py-3 rounded-xl text-sm font-bold text-[#ba1a1a] bg-transparent hover:bg-[#ba1a1a]/5 transition-all">
                  Deactivate account
                </button>
                <button onClick={handleDelete} className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#ba1a1a] hover:bg-red-700 transition-all shadow-lg shadow-[#ba1a1a]/20">
                  Delete account permanently
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {showResetPasswordModal && <ResetPasswordModal onClose={() => setShowResetPasswordModal(false)} />}
    </>
  );
}
