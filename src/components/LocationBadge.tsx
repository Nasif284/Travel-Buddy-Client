import React from "react";
import { useGetLocation } from "../hooks/api/location.hooks";

const LocationBadge = () => {
  const { data, isLoading } = useGetLocation();
  if (isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="flex items-center gap-3 bg-[#f1f4f1] rounded-2xl px-4 py-2 border border-[#bec9c3]/20">
        <div className="h-5 w-5 rounded-full bg-[#0f6e56]/10 flex items-center justify-center text-[#0f6e56]">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-[#181d1a]">
            {data?.data?.city}, {data?.data?.district}, {data?.data?.state}
          </span>
        </div>
      </div>
    );
  }
};

export default LocationBadge;
