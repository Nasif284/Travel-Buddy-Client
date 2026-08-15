"use client";

import { useEffect, useState } from "react";
import { ActivityModalProps, CreateItineraryActivityRequestDTO, CreateItineraryDayRequestDTO, GetGroupItineraryResponseDTO, ItineraryActivityDTO, ItineraryDayDTO } from "../interfaces/interfaces";
import { DUMMY_ITINERARY, getCat } from "../utils/data";
import { formatDayLabel, formatDayNum, formatFullDate, formatMonthShort, generateTripDays, isSameDay } from "../utils/helpers";
import { Icons } from "../utils/icons";
import ActivityCard from "../components/ActivityCard";
import DayModal from "../components/DayModal";
import ActivityModal from "../components/ActivityModal";
import { useAddItineraryActivity, useCreateItineraryDay, useDeleteItineraryActivity, useDeleteItineraryDay, useGetItinerary, useToggleItineraryActivityCompletion, useUpdateItineraryActivity, useUpdateItineraryDay } from "../hooks/hooks";
import { useParams } from "next/navigation";
import { useGetGroup } from "../../../hooks/trip.hooks";
import AIItineraryModal from "../components/AiItineraryModal";

export default function ItineraryPage() {
  const { id } = useParams();
  const { data: tripData, isLoading: loading } = useGetGroup(id as string);
  const { data, isLoading } = useGetItinerary(id as string);
  const [aiModal, setAiModal] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [dayModal, setDayModal] = useState<{ mode: "setup" | "edit" } | null>(null);
  const TRIP_START = tripData?.data?.dateFrom;
  useEffect(() => {
    if (tripData) {
      setSelectedDate(TRIP_START);
    }
  }, [tripData, TRIP_START]);
  const [activityModal, setActivityModal] = useState<{
    mode: "add" | "edit";
    editId?: string;
    initial?: ActivityModalProps["initial"];
  } | null>(null);

  const [dayMenuOpen, setDayMenuOpen] = useState(false);

  const addDay = useCreateItineraryDay();
  const editDay = useUpdateItineraryDay();
  const deleteDay = useDeleteItineraryDay();
  const createActivity = useAddItineraryActivity();
  const editActivity = useUpdateItineraryActivity();
  const deleteActivity = useDeleteItineraryActivity();
  const toggleCompletion = useToggleItineraryActivityCompletion();

  function handleDaySave(data: CreateItineraryDayRequestDTO) {
    if (dayModal?.mode === "setup") {
      console.log("client side date:", data);
      addDay.mutate({ id: id as string, data });
    } else {
      if (!selectedDay) {
        throw new Error("select a day ");
      }
      editDay.mutate({ id: id as string, dayId: selectedDay?.id, data });
    }
    setDayModal(null);
  }

  function handleDeleteDay() {
    setDayMenuOpen(false);
    if (!selectedDay) {
      throw new Error("select a day ");
    }
    if (!window.confirm(`Delete Day ${dayIndex + 1} and all its activities?`)) return;
    deleteDay.mutate({ id: id as string, dayId: selectedDay?.id });
  }

  function handleActivitySave(data: CreateItineraryActivityRequestDTO) {
    if (!selectedDay) {
      throw new Error("select a day ");
    }
    if (!activityModal) {
      throw new Error("select an activity ");
    }
    if (activityModal?.mode === "add") {
      createActivity.mutate({ id: id as string, dayId: selectedDay?.id, data });
    } else {
      editActivity.mutate({ id: id as string, dayId: selectedDay?.id, activityId: activityModal.editId!, data });
    }
    setActivityModal(null);
  }


  function getTripDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return `${diff} ${diff === 1 ? "day" : "days"}`;
  }

  function handleDeleteActivity(activityId: string) {
    if (!selectedDay) {
      throw new Error("select a day ");
    }
    deleteActivity.mutate({ id: id as string, dayId: selectedDay.id, activityId });
  }

  function handleToggleComplete(activityId: string) {
    toggleCompletion.mutate({ id: id as string, dayId: selectedDay.id, activityId });
  }

  // Scroll day strip
  const VISIBLE = 7;
  const [stripStart, setStripStart] = useState(0);

  if (isLoading || loading) {
    return <h1>Loading...</h1>;
  }
  const group = tripData?.data;
  console.log(group);
  const TRIP_END = group.dateTo;

  const itinerary = data?.data;

  const tripDays = generateTripDays(TRIP_START, TRIP_END);

  const selectedDay = itinerary.days.find((d) => isSameDay(d.date, selectedDate!)) ?? null;
  console.log("selectedDate:", selectedDate);
  const dayIndex = tripDays.findIndex((d) => isSameDay(d, selectedDate!));

  const stripEnd = Math.min(stripStart + VISIBLE, tripDays.length);
  const visibleDays = tripDays.slice(stripStart, stripEnd);
  const completedCount = selectedDay?.activities.filter((a) => a.isCompleted).length ?? 0;
  return (
    <div className="flex-1 px-0 flex flex-col gap-0 h-full">
      <div className="bg-white border-b border-[#bec9c3]/10 px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setStripStart((s) => Math.max(0, s - 1))} disabled={stripStart === 0} className="p-1.5 rounded-full hover:bg-[#f1f4f1] text-[#3f4944] transition-colors disabled:opacity-30">
            {Icons.chevronLeft}
          </button>

          {/* Day chips */}
          <div className="flex gap-2 flex-1 overflow-hidden">
            {visibleDays.map((day, i) => {
              const isSelected = isSameDay(day, selectedDate);
              const hasData = itinerary.days.some((d) => isSameDay(d.date, day));
              const globalIdx = stripStart + i;

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`flex-1 min-w-0 flex flex-col items-center py-2.5 px-1 rounded-xl transition-all
                    ${isSelected ? "bg-[#0f6e56] text-white shadow-md" : "hover:bg-[#f1f4f1] text-[#3f4944]"}`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? "text-white/70" : "text-[#bec9c3]"}`}>{formatDayLabel(day)}</span>
                  <span className={`text-xl font-black leading-none mt-0.5 ${isSelected ? "text-white" : "text-[#181d1a]"}`}>{formatDayNum(day)}</span>
                  <span className={`text-[10px] font-bold ${isSelected ? "text-white/70" : "text-[#bec9c3]"}`}>{formatMonthShort(day)}</span>
                  <span className="text-[10px] font-bold mt-1 opacity-80">Day {globalIdx + 1}</span>
                  {/* Dot indicator */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 transition-colors
                    ${hasData ? (isSelected ? "bg-white" : "bg-[#0f6e56]") : "bg-transparent"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Next */}
          <button onClick={() => setStripStart((s) => Math.min(tripDays.length - VISIBLE, s + 1))} disabled={stripEnd >= tripDays.length} className="p-1.5 rounded-full hover:bg-[#f1f4f1] text-[#3f4944] transition-colors disabled:opacity-30">
            {Icons.chevronRight}
          </button>
        </div>
      </div>
            
      {/* ── Day content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden">
        {/* ── No itinerary for this day ───────────────────────── */}
        {!selectedDay ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-[#f1f4f1] rounded-full flex items-center justify-center mb-5 text-[#bec9c3]">{Icons.globe}</div>
            <h3 className="text-xl font-black text-[#181d1a] mb-2 font-headline">No itinerary for Day {dayIndex + 1}</h3>
            <p className="text-[#3f4944] text-sm mb-8 max-w-xs leading-relaxed">{formatFullDate(selectedDate)} is currently empty. Set up this day to start adding activities.</p>
            <button onClick={() => setDayModal({ mode: "setup" })} className="flex items-center gap-2 bg-[#0f6e56] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#005440] active:scale-95 transition-all shadow-md">
              {Icons.plus} Set up this day
            </button>
          </div>
        ) : (
          /* ── Day has data ──────────────────────────────────── */
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Day header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#bec9c3] mb-1">
                  Day {dayIndex + 1} · {formatFullDate(selectedDay.date)}
                </p>
                {selectedDay.location && (
                  <div className="flex items-center gap-1.5 text-[#0f6e56] font-bold text-sm mb-1">
                    {Icons.mapPin} {selectedDay.location}
                  </div>
                )}
                {selectedDay.summary && <p className="text-[#3f4944] text-sm leading-relaxed">{selectedDay.summary}</p>}
                {selectedDay.activities.length > 0 && (
                  <p className="text-[10px] text-[#bec9c3] mt-1">
                    {completedCount}/{selectedDay.activities.length} completed
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Day 3-dot menu */}
                <div className="relative">
                  <button onClick={() => setDayMenuOpen((v) => !v)} className="p-2 rounded-lg text-[#3f4944] hover:bg-[#f1f4f1] transition-colors">
                    {Icons.dotsVertical}
                  </button>
                  {dayMenuOpen && (
                    <>
                      {/* Dismiss overlay */}
                      <div className="fixed inset-0 z-10" onClick={() => setDayMenuOpen(false)} />
                      <div className="absolute right-0 top-10 z-20 bg-white border border-[#bec9c3]/20 rounded-xl shadow-lg overflow-hidden w-44">
                        <button
                          onClick={() => {
                            setDayMenuOpen(false);
                            setDayModal({ mode: "edit" });
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-semibold text-[#181d1a] hover:bg-[#f1f4f1] transition-colors"
                        >
                          {Icons.edit} Edit day info
                        </button>
                        <button onClick={handleDeleteDay} className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/20 transition-colors border-t border-[#f6f3ef]">
                          {Icons.trash} Delete day
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Add activity */}
                <button onClick={() => setActivityModal({ mode: "add" })} className="flex items-center gap-1.5 bg-[#0f6e56] text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-[#005440] active:scale-95 transition-all shadow-sm">
                  {Icons.plusSmall} Add activity
                </button>
              </div>
            </div>

            {/* Progress bar */}
            {selectedDay.activities.length > 0 && (
              <div className="w-full h-1.5 bg-[#e0e3e0] rounded-full overflow-hidden">
                <div className="h-full bg-[#0f6e56] rounded-full transition-all duration-500" style={{ width: `${(completedCount / selectedDay.activities.length) * 100}%` }} />
              </div>
            )}

            {/* Activities list */}
            {selectedDay.activities.length === 0 ? (
              /* No activities yet — prompt to add */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-[#f1f4f1] rounded-full flex items-center justify-center mb-4 text-[#bec9c3]">{Icons.clock}</div>
                <h4 className="text-base font-bold text-[#181d1a] mb-1">No activities yet</h4>
                <p className="text-[#3f4944] text-xs mb-6 max-w-xs">This day is set up but has no activities. Add your first one!</p>
                <button onClick={() => setActivityModal({ mode: "add" })} className="flex items-center gap-1.5 border-2 border-dashed border-[#0f6e56]/40 text-[#0f6e56] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#c9eadb]/20 transition-all">
                  {Icons.plusSmall} Add first activity
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Sort by startTime */}
                {[...selectedDay.activities]
                  .sort((a, b) => {
                    if (!a.startTime) return 1;
                    if (!b.startTime) return -1;
                    return a.startTime.localeCompare(b.startTime);
                  })
                  .map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onEdit={() =>
                        setActivityModal({
                          mode: "edit",
                          editId: activity.id,
                          initial: {
                            title: activity.title,
                            description: activity.description,
                            category: activity.category.code,
                            location: activity.location,
                            latitude: activity.latitude,
                            longitude: activity.longitude,
                            startTime: activity.startTime,
                            durationMinutes: activity.durationMinutes,
                            notes: activity.notes,
                          },
                        })
                      }
                      onDelete={() => handleDeleteActivity(activity.id)}
                      onToggleComplete={() => handleToggleComplete(activity.id)}
                    />
                  ))}

                {/* Add more */}
                <button onClick={() => setActivityModal({ mode: "add" })} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#bec9c3]/40 text-[#3f4944] py-4 rounded-xl font-bold text-xs hover:border-[#0f6e56]/40 hover:text-[#0f6e56] hover:bg-[#c9eadb]/10 transition-all">
                  {Icons.plusSmall} Add another activity
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {dayModal && (
        <DayModal
          mode={dayModal.mode}
          date={selectedDate!}
          dayNumber={dayIndex + 1}
          initial={
            dayModal.mode === "edit" && selectedDay
              ? {
                  location: selectedDay.location,
                  latitude: selectedDay.latitude,
                  longitude: selectedDay.longitude,
                  summary: selectedDay.summary,
                }
              : undefined
          }
          onSave={handleDaySave}
          onClose={() => setDayModal(null)}
        />
      )}

      {activityModal && <ActivityModal mode={activityModal.mode} date={selectedDate!} dayNumber={dayIndex + 1} initial={activityModal.initial} onSave={handleActivitySave} onClose={() => setActivityModal(null)} />}
      {aiModal && <AIItineraryModal id={id as string} tripDestination={group.destination} tripDuration={getTripDuration(group.dateFrom, group.dateTo)} onClose={() => setAiModal(false)} />}
    </div>
  );
}
