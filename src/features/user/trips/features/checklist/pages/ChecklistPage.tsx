"use client";

import { useState, useEffect, useMemo } from "react";
import { Category, CategoryId, CheckItem, Priority, SQUAD_MEMBERS } from "../interfaces/interface";
import ProgressBar from "../components/ProgressBar";
import AssigneePill from "../components/AssigneePill";
import TaskMenu from "../components/TaskMenu";
import TaskFormModal from "../components/TaskFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useParams } from "next/navigation";
import { useCompleteTask, useDeleteTask, useGetChecklist } from "../hooks/checklist.hooks";
import { useAuthStore } from "@/src/store/auth.store";
import { useGetMembers } from "../../members/hooks/hooks";
import { Member } from "../../members/interfaces/interfaces";

const Icons = {
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  other: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  plusCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  flag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
    </svg>
  ),
  dotsVertical: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  ),
  all: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  documents: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  clothing: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  ),
  toiletries: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  electronics: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  essentials: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  checklist: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <polyline points="3 6 4 7 6 5" />
      <polyline points="3 12 4 13 6 11" />
      <polyline points="3 18 4 19 6 17" />
    </svg>
  ),
};

export default function ChecklistPage() {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const { id } = useParams();
  const deleteTask = useDeleteTask();
  const completeTask = useCompleteTask();
  const { data: checklistData, isLoading } = useGetChecklist(id as string);
  console.log(checklistData);
  const checklist = checklistData?.data;
  const categories = checklist?.categories ?? [];
  const groupedItems = checklist?.groupedItems ?? {};
  const myTasks = checklist?.myTasks ?? [];
  const summary = checklist?.summary;
  const { data, isLoading: membersLoading } = useGetMembers(id as string);
  const members = data?.data?.members;
  const currentMember = members?.find((m: Member) => m.userId === currentUserId);

  const [activeCategory, setActiveCategory] = useState<CategoryId>("my");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CheckItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<CheckItem | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const anyModalOpen = isAddTaskOpen || !!editingItem || !!deletingItem;

  const sidebarCategoriesData = categories.map((c: Category) => {
    return { id: c.code, name: c.name, icon: Icons[c.name.toLowerCase()], packed: c.completed, total: c.total };
  });
  const sidebarCategories = [
    {
      id: "my",
      name: "My Tasks",
      icon: Icons.checklist,
      packed: myTasks.filter((t: CheckItem) => t.isCompleted).length,
      total: myTasks.length,
    },
    {
      id: "all",
      name: "All Tasks",
      icon: Icons.all,
      packed: summary?.completed ?? 0,
      total: summary?.total ?? 0,
    },
    ...sidebarCategoriesData,
  ];
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyModalOpen]);

  const pct = summary?.total ? Math.round((summary.completed * 100) / summary.total) : 0;

  const filteredItems = useMemo(() => {
    switch (activeCategory) {
      case "my":
        return myTasks;

      case "all":
        return Object.values(groupedItems).flat();
      default:
        return groupedItems[activeCategory] ?? [];
    }
  }, [activeCategory, groupedItems, myTasks]);

  function toggleItem(taskId: string) {
    completeTask.mutate({ id: id as string, taskId });
  }

  function handleDeleteConfirm() {
    if (!deletingItem) return;
    deleteTask.mutate({ id: id as string, taskId: deletingItem.id });
    setDeletingItem(null);
  }
  const activeCat = useMemo(() => {
    if (activeCategory === "my") return "My Tasks";
    if (activeCategory === "all") return "All Items";
    return categories?.find((c: Category) => c.code === activeCategory)?.name;
  }, [activeCategory, categories]);
  const isAdmin = members?.find((m: Member) => m.userId === currentUserId)?.role === "admin";
  if (isLoading || membersLoading) {
    return <div className="flex-1 px-4 flex flex-col gap-8">Loading...</div>;
  } else {
    return (
      <>
        <div className="flex-1 px-4 flex flex-col gap-8">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-[#181d1a]">
                {summary.completed} of {summary.total} items packed
              </span>
              <span className="bg-[#0f6e56]/10 text-[#0f6e56] px-3 py-1 rounded-full text-xs font-black">Completed {pct}%</span>
            </div>
            <ProgressBar pct={pct} />
          </div>

          {/* Split layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ── Category sidebar ──────────────────────────────────────── */}
            <aside className="w-full lg:w-60 shrink-0">
              <div className="space-y-1">
                {sidebarCategories.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <div key={cat.id}>
                      {cat.id === "all" && <div className="my-4 border-t border-[#bec9c3]/20" />}

                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all
              ${active ? "bg-[#0f6e56] text-white" : cat.id === "my" ? "bg-[#eef8f4] text-[#005440] hover:bg-[#dff1ea]" : "text-[#3f4944] hover:bg-[#e5e9e5]"}`}
                      >
                        <span className="flex items-center gap-2">
                          {cat.icon}
                          {cat.name}
                        </span>

                        <span className={`text-xs font-bold ${active ? "opacity-80" : cat.id === "my" ? "text-[#0f6e56]" : "text-[#005440]"}`}>{cat.id === "all" ? cat.total : `${cat.packed}/${cat.total}`}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* ── Items list ────────────────────────────────────────────── */}
            <div className="flex-1 bg-white rounded-[2rem] p-8 shadow-sm border border-[#bec9c3]/10 w-full">
              {/* List header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black font-headline text-[#181d1a]">{activeCat}</h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsAddTaskOpen(true);
                    }}
                    className="bg-[#0f6e56] text-white px-4 py-2 rounded-xl font-bold text-xs hover:opacity-90 active:scale-95 flex items-center gap-1.5 transition-all"
                  >
                    {Icons.plus} Add Task
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-1">
                {filteredItems.length === 0 && <p className="text-sm text-[#bec9c3] px-4 py-6 text-center">No items yet. Add one below!</p>}
                {filteredItems.map((item: CheckItem) => {
                  const isMyTask = item.assignee?.userId === currentUserId;

                  return (
                    <div key={item.id} className="group relative flex items-center justify-between p-4 rounded-2xl hover:bg-[#f1f4f1] transition-all">
                      {/* Left: checkbox + label + flag */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <button
                          disabled={!isMyTask || item.isCompleted}
                          onClick={() => isMyTask && toggleItem(item.id)}
                          className={` flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${item.isCompleted ? "bg-[#0f6e56] border-[#0f6e56]" : "border-[#bec9c3]"}
                      ${isMyTask ? "cursor-pointer hover:border-[#005440]" : "cursor-default opacity-70"}
                      `}
                        >
                          {item.isCompleted && <span className="text-white">{Icons.check}</span>}
                        </button>

                        <span
                          className={`font-semibold text-sm truncate transition-all
                    ${item.isCompleted ? "line-through text-[#3f4944] opacity-60" : "text-[#181d1a]"}`}
                        >
                          {item.title}
                        </span>

                        {item.priorityCode == "HIGH" && !item.isCompleted && <span className="text-[#ba1a1a] flex-shrink-0">{Icons.flag}</span>}
                      </div>

                      {/* Right: assignee + 3-dot menu */}
                      <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                        {activeCategory !== "my" && <AssigneePill name={isMyTask ? "You" : item.assignee!.fullName} avatar={item.assignee!.avatarUrl!} />}

                        {/* 3-dot trigger — visible on hover */}
                        {isAdmin && (
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === item.id ? null : item.id);
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#bec9c3] hover:text-[#3f4944] hover:bg-[#e5e9e5] transition-all opacity-0 group-hover:opacity-100"
                            >
                              {Icons.dotsVertical}
                            </button>

                            {openMenuId === item.id && (
                              <TaskMenu
                                onEdit={() => {
                                  setEditingItem(item);
                                  setOpenMenuId(null);
                                }}
                                onDelete={() => {
                                  setDeletingItem(item);
                                  setOpenMenuId(null);
                                }}
                                onClose={() => setOpenMenuId(null)}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Add item shortcut */}
                <div className="pt-4 mt-2 border-t border-[#bec9c3]/10">
                  <button onClick={() => setIsAddTaskOpen(true)} className="flex items-center gap-3 px-4 w-full text-left hover:opacity-80 transition-opacity">
                    <span className="text-[#0f6e56]">{Icons.plusCircle}</span>
                    <span className="text-sm font-medium text-[#bec9c3]">Add a new item to {activeCat}…</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Squad summary */}
          <div className="mt-4">
            <h4 className="mb-6 text-2xl font-bold text-[#181d1a] font-headline">Who packed what</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SQUAD_MEMBERS.map((member) => (
                <div key={member.name} className="bg-[#f4f5f4] rounded-3xl px-5 py-4">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={member.avatar} alt={member.name} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <p className="text-[15px] font-bold text-[#181d1a] leading-none">{member.name}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#5f6662]">
                        {member.packed} of {member.total} packed
                      </p>
                    </div>
                  </div>
                  <ProgressBar pct={Math.round((member.packed / member.total) * 100)} h="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {isAddTaskOpen && <TaskFormModal id={id as string} members={members} title="Add New Task" submitLabel="Add to checklist" initialCategory={activeCategory === "all" ? "documents" : activeCategory} categories={categories} onClose={() => setIsAddTaskOpen(false)} isEdit={false} />}
        {editingItem && <TaskFormModal taskId={editingItem.id} members={members} title="Edit Task" submitLabel="Save changes" initialLabel={editingItem.title} initialCategory={editingItem.categoryCode} initialPriority={editingItem.priorityCode} initialAssignee={editingItem.assignee?.id} isEdit={true} initialNotes={editingItem.notes ?? ""} categories={categories} onClose={() => setEditingItem(null)} />}
        {deletingItem && <DeleteConfirmModal label={deletingItem.title} onConfirm={handleDeleteConfirm} onCancel={() => setDeletingItem(null)} />}
      </>
    );
  }
}
