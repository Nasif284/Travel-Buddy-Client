"use client";

import { useEffect, useState } from "react";
import { UserWithDetails } from "../../../../Interfaces/users.interface";
import Link from "next/link";
import { LocationIcon } from "@/src/assets/icons";
import { useGetConversationId } from "../../chat/hooks/hooks";
import { useRouter } from "next/navigation";

export default function TravelerCard({ traveler, isNearBy = false }: { readonly traveler: UserWithDetails; readonly isNearBy: boolean }) {
  const [requestSent, setRequestSent] = useState(false);

  const router = useRouter();

  const { mutateAsync: getConversation, isPending: isGettingConversation } = useGetConversationId();

  const handleMessage = async () => {
    try {
      const response = await getConversation(traveler.id);

      const conversationId = response.data.conversationId;

      router.push(`/messages?conversationId=${conversationId}`);
    } catch (error) {
      console.error("Failed to open conversation:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 shadow-sm">
      <div className="h-[200px] relative">
        <img src={traveler.coverUrl} alt={`${traveler.fullName}'s cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        <div className="absolute bottom-0 left-6 translate-y-1/2 z-10">
          <div className="h-16 w-16 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
            <img src={traveler.avatarUrl} alt={traveler.fullName} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="pt-10 px-4 pb-6 flex flex-col flex-grow">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-[#181d1a]">
            {traveler.fullName}, {traveler.age}
          </h2>

          <p className="text-xs text-[#3f4944] flex items-center gap-1 mt-0.5">
            <LocationIcon />
            {traveler.state}, {traveler.country}
          </p>
        </div>

        <div className="mb-1">
          <span className="inline-block px-3 py-1 bg-[#c9eadb] text-[#4d6b5f] rounded-full text-[10px] font-bold mb-2">{isNearBy ? traveler.distanceKm + " km away" : ""}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {traveler.interests.map((tag) => (
            <span key={tag} className="text-[9px] uppercase font-bold text-[#6f7a74] py-1 px-2 bg-[#ebefeb] rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3">
          <Link href={`/profile/${traveler.id}`} className="flex-1 items-center text-center py-2 text-[12px] font-bold text-[#005440] hover:bg-[#e5e9e5] rounded-xl transition-colors">
            View profile
          </Link>

          {requestSent ? (
            <button disabled className="flex-1 px-2 text-[12px] font-bold bg-[#e0e3e0] text-[#a4a2a2] cursor-not-allowed rounded-xl flex items-center justify-center">
              Request sent
            </button>
          ) : (
            <button disabled={isGettingConversation} onClick={handleMessage} className="flex-1 text-[12px] font-bold bg-[#0f6e56] text-white rounded-xl hover:bg-[#005440] transition-all active:scale-95 disabled:opacity-50">
              {isGettingConversation ? "Opening..." : "Message"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
