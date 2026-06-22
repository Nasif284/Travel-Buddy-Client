"use client";

import Link from "next/link";
import { useGetActiveTrip, useGetTripMatches } from "../hooks/matches.hooks";
import MatchSuggestionCard from "./MatchSuggestionCard";
import {  TripMatchData } from "../interfaces/profile-listing.interface";
import { arrowForward, locationPin, PersonIcon } from "@/src/assets/icons";

const MatchSuggestions = () => {
  const { data: activeTrip, isLoading: loading } = useGetActiveTrip();
  const hasActiveTrip = !!activeTrip?.data;
  const { data, isLoading } = useGetTripMatches(activeTrip?.data?.id, { page: 1, limit: 6 });

  if (isLoading || loading) {
    return <h1>Loading...</h1>;
  }
  if (!isLoading) {
    console.log(data?.data?.matches);
  }

  if (!hasActiveTrip) {
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

        <h3 className="mt-6 text-2xl font-black text-[#181d1a]">Create a Trip to Find Matches</h3>

        <p className="mt-3 text-[#3f4944] max-w-xl mx-auto">Travel matches are based on your destination, travel dates, budget style and travel preferences. Create your first trip and we will suggest the most compatible travelers.</p>

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

  if (data?.data?.matches?.length === 0) {
    return (
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
          href="/trip/matches"
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
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
        {data?.data?.matches.map((match: TripMatchData) => (
          <MatchSuggestionCard match={match.tripMatch} key={match.user.id} traveler={match.user} isNearBy={false} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link href={"/matches"}>
          {" "}
          <button
            className="
            px-4 py-2
            rounded-xl
            border border-[#0f6e56]
            text-[#0f6e56]
            font-semibold
            hover:bg-[#0f6e56]
            hover:text-white
            transition-all
            flex items-center gap-2
          "
          >
            Find More Travel Matches
            {arrowForward}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MatchSuggestions;
