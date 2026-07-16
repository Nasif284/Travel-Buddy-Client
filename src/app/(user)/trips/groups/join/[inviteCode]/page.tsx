"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useJoinWithLink } from "@/src/features/user/trips/features/members/hooks/hooks";

export default function JoinGroupPage() {
  const { inviteCode } = useParams();
  const router = useRouter();
  const join = useJoinWithLink();
  const { mutate, isPending, isSuccess, isError } = join;

  useEffect(() => {
    if (!inviteCode || isPending || isSuccess || isError) return;

    mutate(inviteCode as string, {
      onSuccess: (res) => {
        router.replace(`/trips/groups/${res.data.groupId}/members`);
      },
    });
  }, [inviteCode, isError, isPending, isSuccess, mutate, router]);

  return (
    <main className="ml-64 mt-20 min-h-screen pb-32 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white border border-[#e0e3e0] p-8 text-center shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#eef8f4] flex items-center justify-center text-[#0f6e56]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl font-black text-[#181d1a]">Joining group</h1>
        <p className="mt-2 text-sm text-[#3f4944]">{isError ? "This invite link could not be used." : "Adding you to the trip group..."}</p>
        {isError && (
          <button onClick={() => router.replace("/trips/groups")} className="mt-6 h-11 px-5 rounded-xl bg-[#0f6e56] text-white font-semibold">
            View groups
          </button>
        )}
      </div>
    </main>
  );
}
