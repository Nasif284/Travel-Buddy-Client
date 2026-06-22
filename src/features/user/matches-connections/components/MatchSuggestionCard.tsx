"use client";

import { useEffect, useState } from "react";
import { UserWithDetails } from "../../../../Interfaces/users.interface";
import Link from "next/link";
import { useGetAllRequests, useSendConnectionRequest } from "../hooks/connection.hooks";
import { BuddyRequestModal } from "../../profile/components/BuddyRequestModal";
import { MatchData } from "../interfaces/profile-listing.interface";
import { LocationIcon } from "@/src/assets/icons";
import { RequestData } from "../../profile/interfaces/profile.interface";


export default function MatchSuggestionCard({ traveler, isNearBy = false, match }: { readonly traveler: UserWithDetails; readonly isNearBy: boolean; readonly match: MatchData }) {
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);
  const request = useSendConnectionRequest();
    const { data: requestesRes, isLoading: loadingConnections } = useGetAllRequests();
  const requestSent = requestesRes?.data?.requests?.some((e: RequestData) => e.senderId === traveler?.id || e.receiverId === traveler?.id) ?? false;

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 shadow-sm">
        <div className="h-50 relative ">
          <img src={traveler.coverUrl} alt={`${traveler.fullName}'s cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-4 right-4 bg-[#005440]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">{match.totalPoints}% match</div>
          <div className="absolute bottom-0 left-6 translate-y-1/2 z-10">
            <div className="h-16 w-16 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
              <img src={traveler.avatarUrl} alt={traveler.fullName} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="pt-10 px-6 pb-6 flex flex-col grow">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-[#181d1a]">
              {traveler.fullName}, {traveler.age}
            </h2>
            <p className="text-xs text-[#3f4944] flex items-center gap-1 mt-0.5">
              <LocationIcon />
              {traveler.state}, {traveler.country}
            </p>
          </div>

          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-[#c9eadb] text-[#4d6b5f] rounded-full text-xs font-bold mb-2">
              {match.destination} •{" "}
              {new Date(match.dateFrom).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
              -{" "}
              {new Date(match.dateTo).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
            </span>
            {/* <p className="text-xs text-[#3f4944] font-medium"></p> */}
          </div>
          {/* <div className="mb-2">
          <span className="text-[10px] uppercase font-bold text-[#2c2c2c] py-1 px-2 bg-[#c8f4c8] rounded-lg">{traveler.travelPersonality}</span>
        </div> */}

          <div className="flex flex-wrap gap-2 mb-6">
            {traveler.interests.map((tag) => (
              <span key={tag} className="text-[10px] uppercase font-bold text-[#6f7a74] py-1 px-2 bg-[#ebefeb] rounded-lg">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex gap-3">
            <Link href={`/matches/${match.id}`} className="flex-1 items-center text-center py-3 text-sm font-bold text-[#005440] hover:bg-[#e5e9e5] rounded-xl transition-colors">
              View profile
            </Link>
            {requestSent ? (
              <button disabled className="flex-1 px-2  text-[12px] font-bold bg-[#e0e3e0] text-[#a4a2a2] cursor-not-allowed rounded-xl flex items-center justify-center">
                Request sent
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowBuddyRequestModal(true);
                }}
                className="flex-1 text-[12px] font-bold bg-[#0f6e56] text-white rounded-xl hover:bg-[#005440] transition-all active:scale-95"
              >
                Send request
              </button>
            )}
          </div>
        </div>
      </div>
      <BuddyRequestModal
        isOpen={showBuddyRequestModal}
        onClose={() => setShowBuddyRequestModal(false)}
        user={{
          name: traveler.fullName,
          avatarUrl: traveler.avatarUrl,
        }}
        onSend={(message: string) => {
          console.log(message);
          request.mutate({
            matchId: match.id,
            receiverId: traveler.id,
            message,
          });
        }}
      />
    </>
  );
}
