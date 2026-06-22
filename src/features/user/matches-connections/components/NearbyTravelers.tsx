"use client";
import TravelerCard from "./TravelerCard";
import { useGetNearbyUsers } from "../hooks/users.hooks";
import { UserWithDetails } from "../../../../Interfaces/users.interface";
import { arrowForward } from "@/src/assets/icons";
import Link from "next/link";

const NearbyTravelers = () => {
  const { data: nearbyUsers, isLoading: nearbyLoading } = useGetNearbyUsers({ page: 1, limit: 6 });
  if (nearbyLoading) {
    return <h1>Loading...</h1>;
  } else {
  
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
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
