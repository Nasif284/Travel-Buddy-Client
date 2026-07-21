"use client";
import TravelerCard from "./TravelerCard";
import { useGetNearbyUsers } from "../hooks/users.hooks";
import { UserWithDetails } from "../../../../Interfaces/users.interface";
import { arrowForward, PersonIcon } from "@/src/assets/icons";
import Link from "next/link";
import { useGetLocation } from "@/src/hooks/api/location.hooks";

const NearbyTravelers = () => {
  const { data, isLoading } = useGetLocation();
  const hasEnabled = !!data?.data?.state;
  const { data: nearbyUsers, isLoading: nearbyLoading } = useGetNearbyUsers({ page: 1, limit: 6 }, hasEnabled);
  if (nearbyLoading) {
    return <h1>Loading...</h1>;
  } else {
    if (nearbyUsers?.data?.users.length == 0) {
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

          <h3 className="mt-6 text-2xl font-black text-[#181d1a]">No Nearby Travelers Found!</h3>

          <p className="mt-3 text-[#3f4944] max-w-xl mx-auto">
            {`We couldn't find any travelers near your current location. As more
          travelers comes, we'll automatically suggest them.`}
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-2">
          {nearbyUsers?.data?.users.map((traveler: UserWithDetails) => (
            <TravelerCard key={traveler.id} traveler={traveler} isNearBy={true} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href={"/nearby"}>
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
              Explore Travelers Around You {arrowForward}
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default NearbyTravelers;
