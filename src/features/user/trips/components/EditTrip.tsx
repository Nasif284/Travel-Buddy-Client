"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { arrowForward, calendar, calendarReturn } from "@/src/assets/icons";
import { useCreateTripPlan, useUpdateTripPlan } from "../hooks/trip.hooks";
import { Trip } from "../interfaces/interface";
import { EditTripFormData, editTripSchema } from "../../onboarding/validators/editTrip.validator";

const budgetOptions = [
  {
    code: "budget",
    title: "Budget",
    description: "For saving money",
  },
  {
    code: "moderate",
    title: "Moderate",
    description: "Balanced spending",
  },
  {
    code: "premium",
    title: "Premium",
    description: "Comfort-focused",
  },
  {
    code: "luxury",
    title: "Luxury",
    description: "High-end experiences",
  },
] as const;

export default function EditTrip({ onClose, trip }: Readonly<{ onClose: () => void, trip: Trip }>) {
  const updateTrip = useUpdateTripPlan()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<EditTripFormData>({
    resolver: zodResolver(editTripSchema),
    defaultValues: {
      budgetStyle: trip.budgetStyleCode,
      travelStyleCode: trip.travelStyleCode,
      dateFrom: new Date(trip.dateFrom).toISOString().split("T")[0],
      dateTo: new Date(trip.dateTo).toISOString().split("T")[0],
    },
  });
  const budgetCategory = watch("budgetStyle");
  const tripStyle = watch("travelStyleCode");

  const tripStyles = [
    {
      code: "adventure",
      title: "Adventure",
    },
    {
      code: "leisure",
      title: "Leisure",
    },
    {
      code: "cultural",
      title: "Cultural",
    },
  ] as const;
const onSubmit = (data: EditTripFormData) => {
  updateTrip.mutate({
    id: trip.id,
    data: {
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo),
      budgetStyleCode: data.budgetStyle,
      travelStyleCode: data.travelStyleCode,
    },
  });

  onClose();
};
  const today = new Date().toISOString().split("T")[0];
  const dateFrom = watch("dateFrom");
  const inputBase = "w-full h-14 pl-12 pr-4 bg-[#e0e3e0] rounded-xl border-none outline-none " + "focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all placeholder:text-[#6f7a74] " + "text-[#181d1a] text-sm";

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Departure</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{calendar}</div>
              <input min={today} type="date" {...register("dateFrom")} className={inputBase} />
            </div>
            {errors.dateFrom && <p className="text-red-500 text-sm">{errors.dateFrom.message}</p>}
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Return</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{calendarReturn}</div>
              <input min={dateFrom || today} type="date" {...register("dateTo")} className={inputBase} />
            </div>
            {errors.dateTo && <p className="text-red-500 text-sm">{errors.dateTo.message}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Budget Style</label>

          <div className="grid grid-cols-2 gap-3">
            {budgetOptions.map((budget) => {
              const active = budgetCategory === budget.code;

              return (
                <button
                  key={budget.code}
                  type="button"
                  onClick={() =>
                    setValue("budgetStyle", budget.code, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`
            p-4 rounded-xl border text-left transition-all
            ${active ? "border-[#0f6e56] bg-[#eef8f4] shadow-md" : "border-[#d9dfdb] bg-white hover:border-[#0f6e56]/40"}
          `}
                >
                  <h3 className={`font-bold ${active ? "text-[#0f6e56]" : "text-[#181d1a]"}`}>{budget.title}</h3>

                  <p className="text-sm text-[#6f7a74] mt-1">{budget.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Travel Style</label>
          <div className="flex flex-wrap gap-3">
            {tripStyles.map((s) => {
              const active = tripStyle === s.code;
              return (
                <button
                  key={s.code}
                  type="button"
                  onClick={() =>
                    setValue("travelStyleCode", s.code, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`px-6 py-2.5 rounded-full border text-sm font-semibold font-headline transition-all
                        ${active ? "bg-[#0f6e56] text-white border-[#0f6e56] shadow-md scale-105" : "bg-[#c9eadb] text-[#4d6b5f] border-[#c9eadb] hover:scale-105"}`}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-[#bec9c3]/10">
          <button
            type="submit"
            disabled={!isDirty || updateTrip.isPending}
            className={`
                py-3
    px-6
    rounded-md
    text-white
    font-bold
    transition-all
    flex items-center
    gap-3

    ${!isDirty ? "bg-gray-300 cursor-not-allowed" : "bg-[#0f6e56] hover:opacity-90"}
  `}
          >
            {updateTrip.isPending ? (
              "Updating trip..."
            ) : (
              <>
                Save Changes
                {arrowForward}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
