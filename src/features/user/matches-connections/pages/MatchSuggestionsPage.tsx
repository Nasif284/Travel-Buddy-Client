"use client";

import { useState } from "react";
import { Pagination } from "@/src/components/Pagination";
import { useGetActiveTrip, useGetTripMatches } from "@/src/features/user/matches-connections/hooks/matches.hooks";
import MatchSuggestionCard from "@/src/features/user/matches-connections/components/MatchSuggestionCard";
import { TripMatchData } from "../interfaces/profile-listing.interface";
import SelectTripModal from "../components/SelectTripModal";
import Badge from "../components/Badge";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";
import { arrowForward, locationPin, PersonIcon } from "@/src/assets/icons";
import Link from "next/link";

const LIMIT = 16;

export default function TripMatchesPage() {
  const [page, setPage] = useState(1);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [showTripModal, setShowTripModal] = useState(false);
  const { data: activeTrip, isLoading: loading } = useGetActiveTrip();
  const tripId = selectedTripId || activeTrip?.data?.id;
  const { data, isLoading } = useGetTripMatches(tripId!, { page, limit: LIMIT });
  const [openModal,setOpenModal] = useState(false)
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
  if(!activeTrip.data){
       return (
         <>
           <div className="ml-64 px-16 pt-24 pb-12 space-y-10">
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

               <h3 className="mt-6 text-2xl font-black text-[#181d1a]">Create a Trip to Find Matches</h3>

               <p className="mt-3 text-[#3f4944] max-w-xl mx-auto">Travel matches are based on your destination, travel dates, budget style and travel preferences. Create your first trip and we will suggest the most compatible travelers.</p>

               <button
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
                 onClick={() => setOpenModal(true)}
               >
                 Create a Trip
                 {arrowForward}
               </button>
             </div>{" "}
           </div>

           {openModal && (
             <ModalLayout isOpen={openModal} onClose={() => setOpenModal(false)} title="Create Trip">
               <CreateTrip onClose={() => setOpenModal(false)} />
             </ModalLayout>
           )}
         </>
       );
  }


  return (
    <div className="ml-64 px-16 pt-24 pb-12 space-y-10">
      <section>
        <h1 className="text-4xl font-black text-[#181d1a]">Trip Match Suggestions</h1>

        <p className="text-[#3f4944] mt-2 text-lg">Discover travelers whose plans align with your trip.</p>
      </section>

      <section className="bg-[#eef8f4] border border-[#c9eadb] rounded-3xl p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
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
      {data?.data?.matches?.length === 0 ? (
        <div className="py-16 text-center">
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
            {<PersonIcon />}
          </div>

          <h3 className="mt-6 text-2xl font-black text-[#181d1a]">No Matches Found Yet</h3>

          <p className="mt-3 text-[#3f4944] max-w-xl mx-auto">
            {`We couldn't find any travelers matching your current trip. As more
          travelers create trips, we'll automatically suggest compatible matches.`}
          </p>

          <Link
            href="/trips/plans"
            className="
          inline-flex
          items-center
          gap-2
          mt-8
          px-6 py-3
          rounded-xl
          border border-[#0f6e56]
          text-[#0f6e56]
          font-semibold
          hover:bg-[#0f6e56]
          hover:text-white
          transition-all
        "
          >
            View All Trips
            {arrowForward}
          </Link>
        </div>
      ) : (
        <>
          {" "}
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-[#181d1a]">Suggested Matches</h3>

              <p className="text-[#3f4944] mt-1">Travelers matching your destination, dates and travel style.</p>
            </div>
            <span className="text-sm font-semibold text-[#0f6e56]">{total} matches found</span>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {matches.map((match: TripMatchData) => (
              <MatchSuggestionCard match={match.tripMatch} key={match.user.id} traveler={match.user} isNearBy={false} />
            ))}
          </section>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {showTripModal && <SelectTripModal selected={tripId} onSubmit={(tripId: string) => setSelectedTripId(tripId)} onClose={() => setShowTripModal(false)} />}
    </div>
  );
}


