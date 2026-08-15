import { useState } from "react";
import { getCat } from "../utils/data";
import { Icons } from "../utils/icons";
import ActivityMenu from "./ActivityMenu";
import { formatDuration } from "../utils/helpers";
import { ItineraryActivityDTO } from "../interfaces/interfaces";

export default function ActivityCard({ activity, onEdit, onDelete, onToggleComplete }: { activity: ItineraryActivityDTO; onEdit: () => void; onDelete: () => void; onToggleComplete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cat = getCat(activity.category.code);

  return (
    <div
      className={`relative flex gap-4 p-4 rounded-xl border transition-all group
        ${activity.isCompleted ? "bg-[#f1f4f1] border-[#bec9c3]/10 opacity-60" : "bg-white border-[#bec9c3]/15 shadow-sm hover:-translate-y-0.5 hover:shadow-md"}`}
    >
      {/* Category dot + time column */}
      <div className="flex flex-col items-center gap-1.5 w-10 flex-shrink-0">
        <div className={`w-3 h-3 rounded-full ${cat.dot} mt-1 flex-shrink-0`} />
        {activity.startTime && <span className="text-[10px] font-bold text-[#3f4944] tabular-nums leading-none">{activity.startTime}</span>}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`text-sm font-bold ${activity.isCompleted ? "line-through text-[#6f7a74]" : "text-[#181d1a]"}`}>{activity.title}</h4>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cat.bg} ${cat.color}`}>{activity.category.name}</span>
            {activity.isCompleted && <span className="bg-[#c9eadb] text-[#005440] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">{Icons.check} Done</span>}
          </div>

          {/* 3-dot */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              className="p-1 rounded-lg text-[#bec9c3] hover:text-[#3f4944] hover:bg-[#f1f4f1] transition-colors opacity-0 group-hover:opacity-100"
            >
              {Icons.dotsVertical}
            </button>
            {menuOpen && <ActivityMenu onEdit={onEdit} onDelete={onDelete} onToggle={onToggleComplete} onClose={() => setMenuOpen(false)} />}
          </div>
        </div>

        {activity.description && <p className="text-xs text-[#3f4944] mb-2 leading-relaxed">{activity.description}</p>}

        {/* Meta chips */}
        <div className="flex flex-wrap gap-3 text-[11px] text-[#6f7a74]">
          {activity.durationMinutes && (
            <span className="flex items-center gap-1">
              {Icons.clock} {formatDuration(activity.durationMinutes)}
            </span>
          )}
          {activity.location && (
            <span className="flex items-center gap-1 truncate max-w-[180px]">
              {Icons.mapPin} {activity.location}
            </span>
          )}
          {activity.notes && (
            <span className="flex items-center gap-1 truncate max-w-[180px]" title={activity.notes}>
              {Icons.notes} {activity.notes}
            </span>
          )}
          {activity.createdBy && (
            <span className="flex items-center gap-1 ml-auto">
              {activity.createdBy.avatarUrl ? <img src={activity.createdBy.avatarUrl} alt="" className="w-4 h-4 rounded-full object-cover" /> : <span className="w-4 h-4 rounded-full bg-[#c9eadb] text-[#005440] text-[8px] font-black flex items-center justify-center">{activity.createdBy.fullName.slice(0, 1)}</span>}
              {activity.createdBy.fullName.split(" ")[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}