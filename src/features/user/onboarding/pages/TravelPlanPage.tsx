"use client";

import { useState } from "react";
import DestinationAutocomplete from "../components/DestinationsAutoComplete";
import { CreateTripFormData, createTripSchema } from "../validators/tripPlan.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTripPlan } from "../hooks/onboarding.hooks";
import { arrowForward, calendar, calendarReturn, locationPin, minus, plus } from "@/src/assets/icons";

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

export default function TravelPlanPage() {
  const [search, setSearch] = useState("");
  const tripPlan = useCreateTripPlan();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTripFormData>({
    resolver: zodResolver(createTripSchema),

    defaultValues: {
      budgetStyle: "moderate",
      preferredMembers: 2,
      travelStyleCode: "adventure",
    },
  });
  const destination = watch("destination");
  const budgetCategory = watch("budgetStyle");
  const buddies = watch("preferredMembers");
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

  const onSubmit = (data: CreateTripFormData) => {
    const payload = {
      name: `${data.destination.displayName.split(",")[0]} Trip`,
      placeId: data.destination.placeId,
      destinationName: data.destination.displayName,
      city: data.destination.city,
      state: data.destination.state,
      countryCode: data.destination.countryCode,
      latitude: data.destination.latitude,
      longitude: data.destination.longitude,
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo),
      preferredMembers: data.preferredMembers,
      travelStyleCode: data.travelStyleCode.toLowerCase(),
      budgetStyle: data.budgetStyle,
    };

    tripPlan.mutate(payload);
  };

  const inputBase = "w-full h-14 pl-12 pr-4 bg-[#e0e3e0] rounded-xl border-none outline-none " + "focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all placeholder:text-[#6f7a74] " + "text-[#181d1a] text-sm";

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:py-16">
      <div className="max-w-[640px] w-full bg-white p-8 md:p-14 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#181d1a] tracking-tight mb-3 font-headline">Where are you headed?</h1>
          <p className="text-[#3f4944] leading-relaxed">Your travel plan is shown to potential travel buddies.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Destination</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{locationPin}</div>
              <DestinationAutocomplete
                value={search}
                onChange={setSearch}
                onSelect={(destination) => {
                  setValue("destination", destination, {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.destination && <p className="text-red-500 text-sm">Please select a destination</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Departure</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{calendar}</div>
                <input type="date" {...register("dateFrom")} className={inputBase} />
              </div>
              {errors.dateFrom && <p className="text-red-500 text-sm">{errors.dateFrom.message}</p>}
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Return</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{calendarReturn}</div>
                <input type="date" {...register("dateTo")} className={inputBase} />
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
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Preferred Travel Members Count</label>
            <div className="flex items-center gap-4 bg-[#e0e3e0] w-fit p-1.5 rounded-xl">
              <button type="button" onClick={() => setValue("preferredMembers", Math.max(1, buddies - 1))} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white text-[#005440] hover:bg-[#c9eadb] transition-colors" aria-label="Decrease buddies">
                {minus}
              </button>
              <span className="w-12 text-center font-bold text-xl select-none">{buddies}</span>
              <button type="button" onClick={() => setValue("preferredMembers", buddies + 1)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#0f6e56] text-white hover:bg-[#005440] transition-colors" aria-label="Increase buddies">
                {plus}
              </button>
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

          <div className="flex items-center justify-end pt-8 border-t border-[#bec9c3]/10">
            <button
              type="submit"
              className={`group min-w-[240px] h-[48px] px-6 ${tripPlan.isPending ? "bg-[#addbd0]" : "bg-[#0f6e56]"}  text-white font-bold rounded-md
                  hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2`}
            >
              {tripPlan.isPending ? (
                "Creating trip plan..."
              ) : (
                <>
                  Create my plan &amp; find buddies
                  {arrowForward}{" "}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12 mb-8 text-center">
        <p className="text-[#3f4944] font-headline font-bold text-sm tracking-widest uppercase">Step 4 of 4</p>
      </div>
    </main>
  );
}
