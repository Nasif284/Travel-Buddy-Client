import { arrowForward, close, locationPin } from "@/src/assets/icons";
import { useGetUserUpcomingTrips } from "@/src/features/user/trips/hooks/trip.hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TripCardData } from "../interfaces/profile-listing.interface";

export default function SelectTripModal({ onClose, onSubmit, selected }: { selected: string; onClose: () => void; onSubmit: (tripId: string) => void }) {
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
