"use client";

import { useState } from "react";
import TripCard from "../components/TripCard";
import { useGetUserUpcomingTrips } from "../hooks/trip.hooks";
import { Trip } from "../interfaces/interface";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../components/CreateTrip";
import EditTrip from "../components/EditTrip";
import ConfirmDeleteTripModal from "../components/ConfirmDeleteModal";

export default function ActiveTrips() {
  const [editItem, setEditItem] = useState<Trip | null>(null);
  const [deleteItem, setDeleteItem] = useState<string | null>(null);
  const { data, isLoading } = useGetUserUpcomingTrips();
  const activeTrips = data?.data?.trips;
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return activeTrips?.length > 0 ? (
    <>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {activeTrips.map((trip: Trip) => (
          <TripCard key={trip.id} trip={trip} isActive={true} onDelete={(id: string) => setDeleteItem(id)} onEdit={(trip: Trip) => setEditItem(trip)} />
        ))}
      </div>
      {editItem && (
        <ModalLayout isOpen={!!editItem} onClose={() => setEditItem(null)} title="Create Trip">
          <EditTrip trip={editItem} onClose={() => setEditItem(null)} />
        </ModalLayout>
      )}
      {deleteItem && <ConfirmDeleteTripModal tripId={deleteItem} onClose={() => setDeleteItem(null)} />}
    </>
  ) : (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-[#3f4944] font-medium mb-2">No active trips plans.</p>
      <p className="text-[#6f7a74] text-sm">Trips you create will show up here.</p>
    </div>
  );
}
