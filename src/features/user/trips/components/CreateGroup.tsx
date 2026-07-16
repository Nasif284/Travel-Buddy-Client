import { arrowForward, locationPin } from "@/src/assets/icons";
import { useCrateGroup, useGetUserUpcomingTrips } from "@/src/features/user/trips/hooks/trip.hooks";
import { useState } from "react";
import { TripCardData } from "../../matches-connections/interfaces/profile-listing.interface";
import { Trip } from "../interfaces/interface";
import AddTripButton from "./AddTripButton";

export default function CreateGroup({ onClose }: { onClose: () => void }) {
  const [selectedTrip, setSelectedTrip] = useState("");
  const { data, isLoading } = useGetUserUpcomingTrips();
  const trips = data?.data?.trips.filter((t: Trip) => !t.group) ?? [];

  const createGroup = useCrateGroup();
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

        <h3 className="mt-6 text-2xl font-black text-[#181d1a]">No Active Trips Found!</h3>
        <p className="mt-3 text-[#3f4944] max-w-xl mx-auto">Please create trip plan to start group</p>
        <div className=" w-full flex items-center justify-center mt-6">
          <AddTripButton />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-sm font-bold uppercase tracking-widest text-[#3f4944] mb-4">Select Trip</p>

      <div className="space-y-3">
        {trips.map((trip: TripCardData) => (
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
      <div className="flex mt-5 items-center justify-end border-t border-[#bec9c3]/10">
        <button
          type="submit"
          onClick={() => {
            createGroup.mutate(selectedTrip, {
              onSuccess: () => {
                onClose();
              },
            });
          }}
          className={`group min-w-[240px] h-[48px] px-6 ${createGroup.isPending ? "bg-[#addbd0]" : "bg-[#0f6e56]"}  text-white font-bold rounded-md
                  hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2`}
        >
          {createGroup.isPending ? (
            "Creating group"
          ) : (
            <>
              Create group
              {arrowForward}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
