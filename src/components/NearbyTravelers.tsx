"use client";
import TravelerCard from "./TravelerCard";
import { useGetNearbyUsers } from "../hooks/api/users.hooks";
import { UserWithDetails } from "../Interfaces/users.interface";

const NearbyTravelers = () => {
  const { data: nearbyUsers, isLoading: nearbyLoading } = useGetNearbyUsers({ page: 1, limit: 15 });
  if (nearbyLoading) {
    return <h1>Loading...</h1>;
  } else {
  
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
        {nearbyUsers?.data?.users.map((traveler:UserWithDetails) => (
          <TravelerCard key={traveler.id} traveler={traveler} isNearBy={true} />
        ))}
      </div>
    );
  }
};

export default NearbyTravelers;
