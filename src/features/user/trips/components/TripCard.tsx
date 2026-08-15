import Link from "next/link";
import { Trip } from "../interfaces/interface";
import { useState } from "react";

const CalendarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);interface TripCardProps {
  trip: Trip;
  onEdit?: (trip: Trip) => void;
  onDelete?: (tripId: string) => void;
  isActive:boolean
}

export default function TripCard({ trip, onEdit, onDelete,isActive }: Readonly<TripCardProps>) {
  const [openMenu,setOpenMenu] = useState(false)
  return (
    <div className="group bg-white  rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm">
      <div className="relative h-32 overflow-hidden">
        <img src={trip.destination.coverUrl!} alt={trip.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {isActive && (
          <div className="absolute top-3 right-3">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="
      w-9 h-9
      rounded-full
      bg-white/90
      flex items-center justify-center
    "
            >
              ⋮
            </button>

            {openMenu && (
              <div
                className="
        absolute right-0
        w-36
        bg-white
        rounded-xl
        shadow-lg
        overflow-hidden z-90
      "
              >
                <button onClick={() =>{ onEdit?.(trip);
                setOpenMenu(false);}} className="w-full text-sm px-2 py-2 text-left hover:bg-gray-50">
                  Edit Trip
                </button>

                <button onClick={() => { onDelete?.(trip.id); setOpenMenu(false);}} className="w-full text-sm px-2 py-2 text-left text-red-500 hover:bg-red-50">
                  Delete Trip
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-3 ">
        <h3 className="text-xl font-bold text-[#181d1a] leading-tight mb-2 font-headline">{trip.name}</h3>
        <p className="text-sm text-[#3f4944] mb-2 flex items-center gap-2">
          <CalendarIcon />
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

          {/* <div className="flex mb-2 justify-between items-end">
            <div></div>
            <Link href={`/dashboard/trips/${trip.id}`} className="text-[#0f6e56] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              View memories <ArrowIcon />
            </Link>
          </div> */}
      </div>
    </div>
  );
}
