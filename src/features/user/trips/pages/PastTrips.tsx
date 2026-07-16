"use client";

import TripCard from "../components/TripCard";
import { useGetUserPastTrips } from "../hooks/trip.hooks";
import { Trip } from "../interfaces/interface";

export default function PastTrips() {
  const { data, isLoading } = useGetUserPastTrips()
  const trips = data?.data?.trips
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return trips?.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {trips.map((trip:Trip) => (
        <TripCard key={trip.id} trip={trip} isActive={false} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-[#3f4944] font-medium mb-2">No trips plans yet.</p>
      <p className="text-[#6f7a74] text-sm">Trips you create will show up here.</p>
    </div>
  );
}
