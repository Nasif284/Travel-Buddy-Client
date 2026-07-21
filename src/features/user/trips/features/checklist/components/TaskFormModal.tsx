import { useState } from "react";
import { Priority, TaskFormProps } from "../interfaces/interface";
import { Member } from "../../members/interfaces/interfaces";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData,taskSchema } from "../validators/validator";
import { useAddTask, useEditTask } from "../hooks/checklist.hooks";
const PRIORITY_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  low: { label: "Low", dot: "bg-slate-400", bg: "bg-[#f4f5f4]", text: "text-[#181d1a]" },
  medium: { label: "Medium", dot: "bg-[#0f6e56]", bg: "bg-[#c9eadb]", text: "text-[#022017]" },
  high: { label: "High", dot: "bg-[#ba1a1a]", bg: "bg-[#ffdad6]", text: "text-[#ba1a1a]" },
};

export default function TaskFormModal({id,taskId, title, submitLabel, initialLabel = "", initialCategory = "documents", initialPriority = "medium", initialNotes = "", categories, onClose, members, initialAssignee = members[0].id, isEdit = false }: TaskFormProps) {
  const add = useAddTask()
  const edit  = useEditTask()
  const {
  register,
  handleSubmit,
  control,
  formState: { errors },
} = useForm<TaskFormData>({
  resolver: zodResolver(taskSchema),
  mode:"onBlur",
  defaultValues: {
    title: initialLabel,
    categoryCode: initialCategory.toUpperCase(),
    priorityCode: initialPriority.toUpperCase(),
    assignedTo: initialAssignee,
    notes: initialNotes,
  },
});
  const onSubmit = (data: TaskFormData) => {
    if (isEdit) {
      edit.mutate({ id, taskId: taskId!, data }, {
        onSuccess: () => {
          onClose()
        }
      })
    } else {
      add.mutate(
        { id, data },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181d1a]/60 backdrop-blur-md px-4">
      <div className="bg-white w-full max-w-[560px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#bec9c3]/10">
          <h2 className="text-2xl font-black text-[#181d1a] tracking-tight font-headline">{title}</h2>
          <button type="button" onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1f4f1] transition-colors text-[#3f4944]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden" noValidate>
          <div className="px-8 py-6 overflow-y-auto space-y-6 flex-1">
            {/* Task name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#3f4944] px-1">Task Name</label>
              <input type="text" autoFocus {...register("title")} placeholder="e.g., Print flight tickets" className="w-full h-[52px] px-4 bg-[#f4f5f4] border-none rounded-xl focus:ring-2 focus:ring-[#0f6e56] focus:bg-white transition-all text-[#181d1a] placeholder:text-[#bec9c3] outline-none" />
              {errors.title && <p>{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#3f4944] px-1">Category</label>
              <Controller
                control={control}
                name="categoryCode"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.code}
                        type="button"
                        onClick={() => field.onChange(cat.code.toUpperCase())}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
                      ${field.value.toLowerCase() === cat.code ? "bg-[#0f6e56] text-white" : "bg-[#e5e9e5] text-[#3f4944] hover:bg-[#c9eadb]"}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              />
              {errors.categoryCode && <p className="text-red-500 text-xs mt-2">{errors.categoryCode.message}</p>}
            </div>

            {/* Priority */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#3f4944] px-1">Priority</label>
              <Controller
                control={control}
                name="priorityCode"
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-3">
                    {(["low","medium", "high"] as Priority[]).map((p) => {
                      const cfg = PRIORITY_CONFIG[p];
                      const active = field.value.toLowerCase() === p;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => field.onChange(p.toUpperCase())}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all
                        ${active ? `${cfg.bg} ${cfg.text} border-transparent` : "border-[#bec9c3]/30 text-[#3f4944] hover:bg-[#e5e9e5]"}`}
                        >
                          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.priorityCode && <p className="text-red-500 text-xs mt-2">{errors.priorityCode.message}</p>}
            </div>

            {/* Assign to */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#3f4944] px-1">Assign To</label>
              <Controller
                control={control}
                name="assignedTo"
                render={({ field }) => (
                  <div className="flex gap-4">
                    {members.map((member: Member) => {
                      const selected = field.value === member.id;
                      console.log(member.avatarUrl);
                      return (
                        <div key={member.name} onClick={() => field.onChange(member.id)} className={`flex flex-col items-center gap-2 cursor-pointer transition-opacity ${selected ? "" : "opacity-50 hover:opacity-100"}`}>
                          <div className={`relative w-12 h-12 rounded-full ${selected ? "ring-2 ring-[#0f6e56] ring-offset-1" : ""}`}>
                            <img src={member.avatarUrl!} alt={member.name} className="w-full h-full rounded-full object-cover" />
                            {selected && (
                              <div className="absolute -top-1 -right-1 bg-[#0f6e56] text-white w-5 h-5 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <span className={`text-xs font-bold ${selected ? "text-[#0f6e56]" : "text-[#3f4944]"}`}>{member.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              {errors.assignedTo && <p className="text-red-500 text-xs mt-2">{errors.assignedTo.message}</p>}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#3f4944] px-1">Notes</label>
              <textarea {...register("notes")} rows={3} placeholder="Additional details about the task..." className="w-full p-4 bg-[#f4f5f4] border-none rounded-xl focus:ring-2 focus:ring-[#0f6e56] focus:bg-white transition-all text-[#181d1a] placeholder:text-[#bec9c3] resize-none outline-none" />
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 pt-2">
            <button type="submit" className="w-full h-14 bg-[#0f6e56] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#0f6e56]/20 hover:scale-[1.01] active:scale-95 transition-all">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
