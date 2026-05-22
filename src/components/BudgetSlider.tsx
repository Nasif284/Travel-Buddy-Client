import { useState } from "react";

const BUDGET_STOPS = ["₹5k", "₹15k", "₹30k", "₹50k+"];
export default function BudgetSlider() {
  const [low, setLow] = useState(25);
  const [high, setHigh] = useState(75);

  const stopLabels = BUDGET_STOPS.map((label, i) => ({
    label,
    pct: (i / (BUDGET_STOPS.length - 1)) * 100,
  }));

  function pctToLabel(pct: number) {
    const idx = Math.round((pct / 100) * (BUDGET_STOPS.length - 1));
    return BUDGET_STOPS[Math.min(idx, BUDGET_STOPS.length - 1)];
  }

  function dragThumb(e: React.MouseEvent<HTMLDivElement>, which: "low" | "high") {
    const track = e.currentTarget.parentElement!;
    const rect = track.getBoundingClientRect();

    function onMove(ev: MouseEvent) {
      const pct = Math.max(0, Math.min(100, ((ev.clientX - rect.left) / rect.width) * 100));
      if (which === "low") setLow(Math.min(pct, high - 5));
      if (which === "high") setHigh(Math.max(pct, low + 5));
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <label className="block text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">Budget Range</label>
        <span className="text-[#005440] font-bold text-lg">
          {pctToLabel(low)} – {pctToLabel(high)}
        </span>
      </div>

      <div className="relative py-4">
        <div className="h-2 bg-[#e0e3e0] rounded-full w-full relative">
          <div className="absolute h-full bg-[#0f6e56] rounded-full" style={{ left: `${low}%`, right: `${100 - high}%` }} />
          <div className="absolute -top-2 w-6 h-6 bg-white border-4 border-[#0f6e56] rounded-full shadow-md cursor-grab active:cursor-grabbing" style={{ left: `calc(${low}% - 12px)` }} onMouseDown={(e) => dragThumb(e, "low")} />
          <div className="absolute -top-2 w-6 h-6 bg-white border-4 border-[#0f6e56] rounded-full shadow-md cursor-grab active:cursor-grabbing" style={{ left: `calc(${high}% - 12px)` }} onMouseDown={(e) => dragThumb(e, "high")} />
        </div>
        <div className="flex justify-between mt-4 text-xs font-medium text-[#6f7a74]">
          {stopLabels.map(({ label }) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
