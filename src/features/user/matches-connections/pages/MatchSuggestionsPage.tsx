"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@/src/components/Pagination";
import { useGetActiveTrip, useGetTripMatches } from "@/src/features/user/matches-connections/hooks/matches.hooks";
import MatchSuggestionCard from "@/src/features/user/matches-connections/components/MatchSuggestionCard";
import { useGetUserUpcomingTrips } from "@/src/hooks/api/trip.hooks";
import Link from "next/link";
import { TripCardData, TripMatchData } from "../interfaces/profile-listing.interface";
import { arrowForward, close, locationPin } from "@/src/assets/icons";

const LIMIT = 16;

export default function TripMatchesPage() {
  const [page, setPage] = useState(1);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [showTripModal, setShowTripModal] = useState(false);
  const { data: activeTrip, isLoading: loading } = useGetActiveTrip();
  const tripId = selectedTripId || activeTrip?.data?.id;
  const { data, isLoading } = useGetTripMatches(tripId!, { page, limit: LIMIT });

  const matches = data?.data?.matches ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const total = data?.data?.total ?? 1;

  if (isLoading || loading) {
    return (
      <div className="ml-64 px-16 pt-24 pb-12 space-y-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="ml-64 px-16 pt-24 pb-12 space-y-10">
      {/* Page Header */}
      <section>
        <h1 className="text-4xl font-black text-[#181d1a]">Trip Match Suggestions</h1>

        <p className="text-[#3f4944] mt-2 text-lg">Discover travelers whose plans align with your trip.</p>
      </section>

      {/* Active Trip Summary */}
      <section className="bg-[#eef8f4] border border-[#c9eadb] rounded-3xl p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {" "}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#0f6e56]">Active Trip</p>

          <h2 className="text-3xl font-black text-[#181d1a] mt-2">{activeTrip.data.name}</h2>

          <div className="flex flex-wrap gap-3 mt-4">
            <Badge>{activeTrip.data.destination.name}</Badge>
            <Badge>
              {new Date(activeTrip.data.dateFrom).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(activeTrip.data.dateTo).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Badge>
            <Badge>{activeTrip.data.travelStyleCode}</Badge>
            <Badge>{activeTrip.data.budgetStyleCode}</Badge>
          </div>
        </div>
        <button
          onClick={() => setShowTripModal(true)}
          className="
            px-6 py-3
            rounded-xl
            bg-white
            border border-[#d9dfdb]
            font-semibold
            hover:border-[#0f6e56]
            transition-all
          "
        >
          Change Trip
        </button>
      </section>

      {/* Result Info */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {" "}
        <div>
          <h3 className="text-xl font-bold text-[#181d1a]">Suggested Matches</h3>

          <p className="text-[#3f4944] mt-1">Travelers matching your destination, dates and travel style.</p>
        </div>
        <span className="text-sm font-semibold text-[#0f6e56]">{total} matches found</span>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {matches.map((match:TripMatchData) => (
          <MatchSuggestionCard match={match.tripMatch} key={match.user.id} traveler={match.user} isNearBy={false} />
        ))}
      </section>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {showTripModal && <SelectTripModal selected={tripId} onSubmit={(tripId: string) => setSelectedTripId(tripId)} onClose={() => setShowTripModal(false)} />}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        px-4 py-2
        rounded-full
        bg-white
        border border-[#d9dfdb]
        text-sm font-semibold
      "
    >
      {children}
    </span>
  );
}

function SelectTripModal({ onClose, onSubmit, selected }: {selected:string, onClose: () => void; onSubmit: (tripId: string) => void }) {
  const [selectedTrip, setSelectedTrip] = useState(selected);
  // const [verifiedOnly, setVerifiedOnly] = useState(false);
  const { data, isLoading } = useGetUserUpcomingTrips();
  const trips = data?.data?.trips ?? [];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (trips.length == 0) {
    return (
      <div
        className="
     
          p-12
          text-center
        "
      >
        <div
          className="
            w-20 h-20
            mx-auto
            rounded-2xl
            bg-[#eef8f4]
            flex items-center justify-center
            text-[#0f6e56]
          "
        >
          {locationPin}
        </div>

        <h3 className="mt-6 text-2xl font-black text-[#181d1a]">No more Active Trips Found!</h3>

        <p className="mt-3 text-[#3f4944] max-w-xl mx-auto">Travel matches are based on your destination, travel dates, budget style and travel preferences. Create your more trips and we will suggest the most compatible travelers.</p>

        <Link
          href="/onboarding/travel-plan"
          className="
            inline-flex
            items-center
            gap-2
            mt-8
            px-6 py-3
            rounded-xl
            bg-[#0f6e56]
            text-white
            font-semibold
            hover:opacity-90
            transition-all
          "
        >
          Create a Trip
          {arrowForward}
        </Link>
      </div>
    );
  }


  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
        p-6
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-3xl
          max-h-[90vh]
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          flex flex-col
        "
      >
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Find Matches For Another Trip</h2>

              <button
                onClick={onClose}
                className="
                  w-10 h-10
                  rounded-full
                  hover:bg-gray-100
                  flex items-center justify-center
                "
              >
                {close}
              </button>
            </div>

            <div className="mt-10">
              <p className="text-sm font-bold uppercase tracking-widest text-[#3f4944] mb-4">Select Trip</p>

              <div className="space-y-3">
                {trips.map((trip:TripCardData) => (
                  <button
                    key={trip.id}
                    type="button"
                    onClick={() => setSelectedTrip(trip.id)}
                    className={`
                      w-full
                      p-5
                      rounded-2xl
                      border
                      text-left
                      transition-all
                      ${selectedTrip === trip.id ? "border-[#0f6e56] bg-[#eef8f4]" : "border-[#d9dfdb] hover:border-[#0f6e56]/40"}
                    `}
                  >
                    <h3 className="font-bold text-lg">{trip.name}</h3>

                    <p className="text-sm text-[#6f7a74] mt-1">
                      {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                      })}{" "}
                      -{" "}
                      {new Date(trip.dateTo).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            {/* 
            <div className="mt-10">
              <p className="text-sm font-bold uppercase tracking-widest text-[#3f4944] mb-4">Filters</p>

              <div className="mt-6 flex items-center justify-between bg-[#f5f7f6] rounded-xl p-4">
                <span className="font-medium">Verified travelers only</span>

                <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-t bg-[#f5f7f6] p-6 flex justify-between">
          {/* <button className="font-semibold text-[#0f6e56]">Clear all</button> */}
          <div></div>

          <button
            className="
              px-8 py-3
              rounded-xl
              bg-[#0f6e56]
              text-white
              font-bold
              hover:opacity-90
            "
            onClick={() => {
              onSubmit(selectedTrip);
              onClose();
            }}
          >
            Find Matches
          </button>
        </div>
      </div>
    </div>
  );
}
