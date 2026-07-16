"use client";

import { useDeleteTripPlan } from "../hooks/trip.hooks";

interface ConfirmDeleteTripProps {
  tripId: string;
  onClose: () => void;
}

export default function ConfirmDeleteTrip({ tripId, onClose }: ConfirmDeleteTripProps) {
  const deleteTrip = useDeleteTripPlan();

  const handleDelete = () => {
    deleteTrip.mutate(tripId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          bg-white
          rounded-2xl
          shadow-2xl
          p-6
        "
      >
        <div
          className="
            w-14 h-14
            mx-auto
            rounded-full
            bg-red-100
            flex items-center justify-center
            text-2xl
          "
        >
          🗑️
        </div>

        <h3 className="mt-4 text-center text-xl font-bold text-[#181d1a]">Delete Trip?</h3>

        <p className="mt-2 text-center text-[#6f7a74]">
          Are you sure you want to delete?
        </p>

        <p className="mt-1 text-center text-sm text-red-500">This action cannot be undone.</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="
              flex-1
              h-11
              rounded-xl
              border border-[#d9dfdb]
              font-semibold
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteTrip.isPending}
            className="
              flex-1
              h-11
              rounded-xl
              bg-red-500
              text-white
              font-semibold
              hover:bg-red-600
              disabled:opacity-50
            "
          >
            {deleteTrip.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
