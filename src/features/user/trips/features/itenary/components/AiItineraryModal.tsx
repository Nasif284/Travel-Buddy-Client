import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAiItineraryGenerate, useSaveGenerated } from "../hooks/hooks";

// ── DTOs ──────────────────────────────────────────────────────────────────────
export interface GenerateAiItineraryRequestDTO {
  tripPace: string;
  interests: string[];
  notes?: string;
}

export interface GeneratedActivity {
  title: string;
  description?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  category: string;
  startTime?: string;
  durationMinutes?: number;
  notes?: string;
}

export interface GeneratedDay {
  date: string; // ISO date string
  location?: string;
  latitude?: number;
  longitude?: number;
  summary?: string;
  activities: GeneratedActivity[];
}

export interface GeneratedItinerary {
  days: GeneratedDay[];
}

// ── Form shape ────────────────────────────────────────────────────────────────
interface FormValues {
  tripPace: "Relaxed" | "Balanced" | "Active";
  interests: string[];
  notes: string;
}

// ── Static config ─────────────────────────────────────────────────────────────
const ALL_INTERESTS = ["Nature", "Beaches", "Culture", "Food", "Nightlife", "Adventure", "Shopping", "Wellness"];

const PACE_OPTIONS: FormValues["tripPace"][] = ["Relaxed", "Balanced", "Active"];

// ── Icons ─────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="18" y1="18" x2="6" y2="6" />
  </svg>
);
const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#005440]">
    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74Z" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#005440">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4.5-4.5 1.41-1.41L10 13.67l7.09-7.09L18.5 8l-8.5 8.5z" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Dummy itinerary for optimistic preview (replace with real API response) ───
const DUMMY_ITINERARY: GeneratedItinerary = {
  days: [
    {
      date: "2025-07-12",
      location: "Seminyak, Bali",
      summary: "Arrival & Seminyak Vibes",
      activities: [
        { title: "Check-in at W Bali", description: "Seminyak beachfront luxury", startTime: "10:00", category: "ACCOMMODATION" },
        { title: "Lunch at Sisterfields", description: "Boutique cafe dining • ₹1,200", startTime: "13:30", category: "FOOD" },
        { title: "Sunset at Potato Head", description: "Beach club experience • ₹2,500", startTime: "17:00", category: "LEISURE" },
      ],
    },
    {
      date: "2025-07-13",
      location: "Ubud, Bali",
      summary: "Ubud Cultural Escape",
      activities: [
        { title: "Tegalalang Rice Terrace", description: "Scenic hike & photography • ₹200", startTime: "09:00", category: "NATURE" },
        { title: "Sacred Monkey Forest", description: "Ancient temple sanctuary • ₹500", startTime: "11:30", category: "CULTURE" },
      ],
    },
    {
      date: "2025-07-14",
      location: "Nusa Penida, Bali",
      summary: "Nusa Penida Boat Trip",
      activities: [{ title: "Fast Boat from Sanur", description: "Return ferry ticket • ₹1,800", startTime: "07:00", category: "TRANSPORT" }],
    },
  ],
};

// ── Helper: format date to "Day N" label ─────────────────────────────────────
function dayLabel(index: number) {
  return `Day ${index + 1}`;
}

// ── Left panel: generation form ───────────────────────────────────────────────
function GenerateForm({ tripDestination, tripDuration, onGenerate, generating }: { tripDestination: string; tripDuration: string; onGenerate: (dto: GenerateAiItineraryRequestDTO) => void; generating: boolean }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tripPace: "Balanced",
      interests: ["Nature", "Beaches", "Food", "Adventure"],
      notes: "",
    },
  });

  const selectedInterests = watch("interests");

  const onValid = (values: FormValues) => {
    onGenerate({
      tripPace: values.tripPace,
      interests: values.interests,
      notes: values.notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6">
      {/* Destination — locked */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#3f4944] mb-2">Destination</label>
        <div className="h-12 bg-[#e5e9e5] rounded-xl flex items-center justify-between px-4">
          <span className="text-[#181d1a] font-semibold text-sm">{tripDestination.split(",")[0]}</span>
          <span className="text-[#6f7a74]">
            <LockIcon />
          </span>
        </div>
      </div>

      {/* Duration — locked */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#3f4944] mb-2">Duration</label>
        <div className="h-12 bg-[#e5e9e5] rounded-xl flex items-center justify-between px-4">
          <span className="text-[#181d1a] font-semibold text-sm">{tripDuration}</span>
          <span className="text-[#6f7a74]">
            <LockIcon />
          </span>
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#3f4944] mb-3">Interests</label>
        {errors.interests && <p className="text-[#ba1a1a] text-xs mb-2">Select at least one interest</p>}
        <Controller
          name="interests"
          control={control}
          rules={{ validate: (v) => v.length > 0 || "Select at least one" }}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {ALL_INTERESTS.map((interest) => {
                const active = field.value.includes(interest);
                return (
                  <button key={interest} type="button" onClick={() => field.onChange(active ? field.value.filter((i) => i !== interest) : [...field.value, interest])} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${active ? "bg-[#c9eadb] text-[#005440]" : "bg-[#e5e9e5] text-[#4d6b5f] hover:bg-[#c9eadb]/50"}`}>
                    {interest}
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>

      {/* Trip vibe / pace */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#3f4944] mb-3">Trip vibe</label>
        <Controller
          name="tripPace"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2">
              {PACE_OPTIONS.map((pace) => (
                <button key={pace} type="button" onClick={() => field.onChange(pace)} className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${field.value === pace ? "bg-[#005440] text-white" : "border border-[#bec9c3]/40 text-[#3f4944] hover:bg-[#c9eadb]/30"}`}>
                  {pace}
                </button>
              ))}
            </div>
          )}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#3f4944] mb-2">Notes</label>
        <textarea {...register("notes")} placeholder="Any specific places to visit or avoid?" className="w-full bg-[#e0e3e0] border-none rounded-xl p-4 text-sm min-h-[100px] focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all outline-none resize-none" />
      </div>

      {/* CTA */}
      <button type="submit" disabled={generating} className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
        {generating ? (
          <>
            <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating…
          </>
        ) : (
          <>
            Generate itinerary
            <ArrowIcon />
          </>
        )}
      </button>
    </form>
  );
}

// ── Right panel: generated itinerary preview ──────────────────────────────────
function ItineraryPreview({ itinerary, onRegenerate, onSave, generating, saving }: { itinerary: GeneratedItinerary | null; onRegenerate: () => void; onSave: () => void; generating: boolean; saving: boolean }) {
  if (generating) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#3f4944]">
        <svg className="animate-spin w-8 h-8 text-[#005440]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-sm font-medium">Building your perfect itinerary…</p>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center text-center px-6 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#c9eadb]/40 flex items-center justify-center">
          <SparkleIcon />
        </div>
        <div>
          <p className="font-bold text-[#181d1a] text-sm mb-1">Your itinerary will appear here</p>
          <p className="text-xs text-[#6f7a74]">Fill in the form and hit Generate to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Status + action row */}
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-[#181d1a]">{itinerary.days.length}-day itinerary generated</span>
          <CheckCircleIcon />
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-shrink-0">
        <button onClick={onRegenerate} className="flex-1 h-10 bg-[#e5e9e5] text-[#005440] font-bold text-xs rounded-xl hover:bg-[#e0e3e0] transition-colors flex items-center justify-center gap-1.5">
          <RefreshIcon /> Regenerate
        </button>
        <button onClick={onSave} disabled={saving} className="flex-1 h-10 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70">
          {saving ? (
            <>
              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving…
            </>
          ) : (
            <>
              <SaveIcon /> Save to trip
            </>
          )}
        </button>
      </div>

      {/* Scrollable day list */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-6" style={{ scrollbarWidth: "thin", scrollbarColor: "#bec9c3 transparent" }}>
        {itinerary.days.map((day, i) => {
          const opacity = i === 0 ? "border-[#005440]" : i === 1 ? "border-[#005440]/50" : "border-[#005440]/20";
          return (
            <div key={i} className={`relative pl-10 border-l-4 ${opacity}`}>
              <div className="mb-3">
                <h4 className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? "text-[#005440]" : "text-[#005440]/60"}`}>{dayLabel(i)}</h4>
                <p className="text-sm font-bold text-[#181d1a] mt-0.5">{day.summary ?? day.location}</p>
                {day.location && day.summary && <p className="text-[10px] text-[#6f7a74] mt-0.5">{day.location}</p>}
              </div>

              {day.activities.length > 0 && (
                <div className="space-y-3">
                  {day.activities.map((act, j) => (
                    <div key={j} className="flex gap-3">
                      <span className="text-[10px] font-bold text-[#6f7a74] w-10 shrink-0 pt-0.5">{act.startTime ?? "—"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#181d1a] truncate">{act.title}</p>
                        {act.description && <p className="text-[10px] text-[#6f7a74] truncate">{act.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
interface Props {
  id: string;
  tripDestination: string;
  tripDuration: string;
  onClose: () => void;
}

export default function AIItineraryModal({ id, tripDestination, tripDuration, onClose }: Props) {
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  // Keep last DTO so Regenerate re-uses the same settings
  const [lastDTO, setLastDTO] = useState<GenerateAiItineraryRequestDTO | null>(null);
    const generate = useAiItineraryGenerate();
    const save = useSaveGenerated()
  const handleGenerate = async (dto: GenerateAiItineraryRequestDTO) => {
      generate.mutate({ id, data: dto }, {
          onSuccess: (res) => {
              setItinerary(res.data)
        }
    });
  };

  const handleRegenerate = () => {
    // if (lastDTO) handleGenerate(lastDTO);
  };

  const handleSave = async () => {
    if (!itinerary) return;
    save.mutate({id,data:itinerary})
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(24,29,26,0.6)", backdropFilter: "blur(8px)" }}>
      <div className="bg-white w-full relative  rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]" style={{ maxWidth: "800px" }}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-10  p-2 rounded-full hover:bg-[#e5e9e5] transition-colors z-10 text-[#3f4944]" aria-label="Close" style={{ top: "20px", right: "20px" }}>
          <CloseIcon />
        </button>

        {/* Header */}
        <div className=" py-5 text-center flex-shrink-0 px-5">
          <div className="flex items-center text-center justify-center gap-2 mb-1">
            <h2 className="text-2xl font-headline font-bold text-[#005440] tracking-tight">AI Trip Planner</h2>
            <SparkleIcon />
          </div>
          <p className="text-[#3f4944] text-sm font-medium">Tell us about your trip and we&apos;ll create a day-by-day itinerary.</p>
        </div>

        {/* Two-column body */}
        <div className=" w-full flex overflow-hidden">
          {/* Left: form */}
          <div className=" px-8 pb-8 pt-2 border-r border-[#bec9c3]/20 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#bec9c3 transparent", width: "50%" }}>
            <GenerateForm  tripDestination={tripDestination} tripDuration={tripDuration} onGenerate={handleGenerate} generating={generate.isPending} />
          </div>

          {/* Right: preview */}
          <div className=" px-8 pt-6 pb-8 flex flex-col overflow-hidden bg-[#f1f4f1]/30" style={{ width: "50%" }}>
            <ItineraryPreview itinerary={itinerary} onRegenerate={handleRegenerate} onSave={handleSave} generating={generating} saving={save.isPending} />
          </div>
        </div>
      </div>
    </div>
  );
}
