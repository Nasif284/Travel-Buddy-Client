"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { UserAction, UserActionModal } from "../components/UsersActionModal";
import { ActionModalState, GetUserProfileResponseDTO, TabId, TABS } from "../interfaces/users.interfaces";
import StatusBadge from "../components/StatusBadge";
import ProfileTab from "../components/ProfileTab";
import TripsTab from "../components/TripsTab";
import ComingSoonTab from "../components/ComingSoonTab";
import { useChangeUserStatus, useGetUserProfile, useGetUserTripGroups } from "../hooks/user-management.hooks";

const Icons = {
  verified: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  block: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  delete: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};

function getLocation(profile: GetUserProfileResponseDTO): string {
  return [profile.city, profile.state, profile.country].filter(Boolean).join(", ") || "—";
}

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params.id as string;

  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [actionModal, setActionModal] = useState<ActionModalState | null>(null);

  const { data: profileData, isLoading } = useGetUserProfile(userId);
  const changeStatus = useChangeUserStatus();


  const isPending = false;

  async function handleConfirm(id: string, action: UserAction, reason: string) {
    await changeStatus.mutateAsync({ userId: id, action, reason });
    console.log("action", { id, action, reason });
    setActionModal(null);
  }

  if (isLoading ) {
    return (
      <div className="p-8 pt-20">
        <div className="h-40 bg-[#e5e2de] rounded-xl animate-pulse mb-8" />
        <div className="h-64 bg-[#e5e2de] rounded-xl animate-pulse" />
      </div>
    );
  }
  const profile = profileData?.data;
  const accountStatus = profile?.status;
  const statCards = [
    { label: "Trips", value: profile?.tripCount, color: "text-[#1c1c1a]" },
    { label: "Buddies", value: profile?.connectionsCount, color: "text-[#1c1c1a]" },
    { label: "Rating", value: "0", color: "text-[#1c1c1a]", star: true },
    { label: "Reports", value: "0", color: "text-[#ba1a1a]" },
  ];
  return (
    <div className="p-8 pt-20 space-y-8 max-w-7xl mx-auto">
      {/* ── Profile header ─────────────────────────────────────── */}
      <section className="bg-white rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden border border-[#bec9c3]/15 shadow-sm">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#005440]/5 rounded-bl-full -mr-10 -mt-10" />

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg border-4 border-[#fcf9f5] bg-[#e5e2de]">{profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl font-black text-[#005440]">{profile.fullName.slice(0, 2).toUpperCase()}</div>}</div>
          {(profile.isPhoneVerified || profile.isEmailVerified) && <div className="absolute -bottom-2 -right-2 bg-[#005440] text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md">{Icons.verified}</div>}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight text-[#1c1c1a]">{profile.fullName}</h1>
              <StatusBadge status={accountStatus} />
            </div>
            <p className="text-[#3f4944] font-medium mt-1">
              {profile.travelType ?? "Traveler"} · {getLocation(profile)}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {/* <button className="flex items-center gap-2 px-5 py-2 bg-[#ebe8e4] hover:bg-[#e5e2de] text-[#1c1c1a] text-sm font-semibold rounded-lg transition-all active:scale-95">{Icons.mail} Send Warning</button> */}
            {accountStatus !== "suspended" && (
              <button onClick={() => setActionModal({ userId, action: "suspend" })} className="flex items-center gap-2 px-5 py-2 bg-[#ffdad4] text-[#743329] text-sm font-semibold rounded-lg hover:brightness-95 transition-all active:scale-95">
                {Icons.block} Suspend
              </button>
            )}
            {accountStatus !== "banned" && (
              <button onClick={() => setActionModal({ userId, action: "ban" })} className="flex items-center gap-2 px-5 py-2 bg-[#ffdad6] text-[#93000a] text-sm font-semibold rounded-lg hover:brightness-95 transition-all active:scale-95">
                {Icons.delete} Ban
              </button>
            )}
            {(accountStatus === "suspended" || accountStatus === "banned") && (
              <button onClick={() => setActionModal({ userId, action: "activate" })} className="flex items-center gap-2 px-5 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-lg hover:brightness-95 transition-all active:scale-95">
                {Icons.check} Activate
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto">
          {statCards.map(({ label, value, color, star }) => (
            <div key={label} className="bg-[#f6f3ef] p-4 rounded-xl text-center min-w-[90px]">
              <p className="text-[#3f4944] text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
              <div className={`flex items-center justify-center gap-1 text-2xl font-extrabold ${color}`}>
                {value}
                {star && <span className="text-[#005440]">{Icons.star}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex border-b border-[#bec9c3]/30 gap-8">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab.id ? "text-[#005440] font-bold" : "text-[#3f4944] hover:text-[#1c1c1a]"}`}>
              {tab.label}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#005440] rounded-t-full" />}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "profile" && <ProfileTab profile={profile} />}
        {activeTab === "trips" && <TripsTab userId={userId} />}
        {activeTab === "activity" && <ComingSoonTab label="Activity" />}
        {activeTab === "reports" && <ComingSoonTab label="Reports" />}
      </div>

      {actionModal && <UserActionModal userId={actionModal.userId} action={actionModal.action} onConfirm={handleConfirm} onClose={() => setActionModal(null)} isLoading={isPending} />}
    </div>
  );
}
