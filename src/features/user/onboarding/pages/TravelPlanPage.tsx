"use client";

import { Icons } from "@/src/assets";
import BudgetSlider from "@/src/components/BudgetSlider";
import { useState } from "react";

type TripStyle = "Chill" | "Adventure" | "Party";

export default function TravelPlanPage() {
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [buddies, setBuddies] = useState(2);
  const [tripStyle, setTripStyle] = useState<TripStyle>("Adventure");
  const [notes, setNotes] = useState("");

  const tripStyles: TripStyle[] = ["Chill", "Adventure", "Party"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ destination, departure, returnDate, buddies, tripStyle, notes });
    // router.push("/dashboard");
  }

  const inputBase = "w-full h-14 pl-12 pr-4 bg-[#e0e3e0] rounded-xl border-none outline-none " + "focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all placeholder:text-[#6f7a74] " + "text-[#181d1a] text-sm";

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:py-16">
      <div className="max-w-[640px] w-full bg-white p-8 md:p-14 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#181d1a] tracking-tight mb-3 font-headline">Where are you headed?</h1>
          <p className="text-[#3f4944] leading-relaxed">Your travel plan is shown to potential travel buddies.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Destination</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{Icons.locationPin}</div>
              <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Search for cities or landmarks..." className={inputBase} />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Departure</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{Icons.calendar}</div>
                <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className={inputBase} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Return</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors">{Icons.calendarReturn}</div>
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputBase} />
              </div>
            </div>
          </div>

          <BudgetSlider />

          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Travel Buddies</label>
            <div className="flex items-center gap-4 bg-[#e0e3e0] w-fit p-1.5 rounded-xl">
              <button type="button" onClick={() => setBuddies((n) => Math.max(1, n - 1))} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white text-[#005440] hover:bg-[#c9eadb] transition-colors" aria-label="Decrease buddies">
                {Icons.minus}
              </button>
              <span className="w-12 text-center font-bold text-xl select-none">{buddies}</span>
              <button type="button" onClick={() => setBuddies((n) => n + 1)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#0f6e56] text-white hover:bg-[#005440] transition-colors" aria-label="Increase buddies">
                {Icons.plus}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Travel Style</label>
            <div className="flex flex-wrap gap-3">
              {tripStyles.map((s) => {
                const active = tripStyle === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTripStyle(s)}
                    className={`px-6 py-2.5 rounded-full border text-sm font-semibold font-headline transition-all
                        ${active ? "bg-[#0f6e56] text-white border-[#0f6e56] shadow-md scale-105" : "bg-[#c9eadb] text-[#4d6b5f] border-[#c9eadb] hover:scale-105"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Additional Notes</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us more about your ideal trip..." className="w-full p-4 bg-[#e0e3e0] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all placeholder:text-[#6f7a74] text-[#181d1a] text-sm resize-none" />
          </div>

          <div className="flex items-center justify-end pt-8 border-t border-[#bec9c3]/10">
            <button
              type="submit"
              className="group min-w-[240px] h-[48px] px-6 bg-[#0f6e56] text-white font-bold rounded-md
                  hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              Create my plan &amp; find buddies
              {Icons.arrowForward}
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
