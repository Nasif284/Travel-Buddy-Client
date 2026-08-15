"use client";

import { useState, useEffect } from "react";
import { CatConfig, CategoryCode, ExpenseResponseDTO, GetExpensesResponseDTO, SquadMember } from "../interface/interface";
import ExpenseModal from "../components/AddExpenceModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ExpenseRow from "../components/ExpenseRow";
import { useParams } from "next/navigation";
import { useGetMembers } from "../../members/hooks/hooks";
import { useDeleteExpense, useGetExpenses } from "../hooks/hooks";

export const Icons = {
  plus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  hotel: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V8l9-6 9 6v14" />
      <path d="M9 22V12h6v10" />
      <path d="M3 11h18" />
    </svg>
  ),
  food: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  car: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  activity: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  shopping: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  ticket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
      <line x1="9" y1="2" x2="9" y2="22" strokeDasharray="2 3" />
    </svg>
  ),
  entertainment: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" />
      <polyline points="17 2 12 7 7 2" />
      <line x1="2" y1="7" x2="22" y2="7" />
      <line x1="7" y1="2" x2="7" y2="7" />
      <line x1="12" y1="2" x2="12" y2="7" />
      <line x1="17" y1="2" x2="17" y2="7" />
    </svg>
  ),
  medical: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  other: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="8" r=".5" fill="currentColor" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  ),
};

export const CATEGORY_CONFIG: Record<CategoryCode, CatConfig> = {
  ACCOMMODATION: {
    icon: Icons.hotel,
    bg: "bg-blue-100",
    text: "text-blue-600",
    bar: "bg-blue-500",
    label: "Accommodation",
  },
  FOOD: {
    icon: Icons.food,
    bg: "bg-amber-100",
    text: "text-amber-600",
    bar: "bg-amber-500",
    label: "Food",
  },
  TRANSPORT: {
    icon: Icons.car,
    bg: "bg-purple-100",
    text: "text-purple-600",
    bar: "bg-purple-500",
    label: "Transport",
  },
  ACTIVITIES: {
    icon: Icons.activity,
    bg: "bg-green-100",
    text: "text-green-600",
    bar: "bg-green-500",
    label: "Activities",
  },
  SHOPPING: {
    icon: Icons.shopping,
    bg: "bg-pink-100",
    text: "text-pink-600",
    bar: "bg-pink-500",
    label: "Shopping",
  },
  TICKETS: {
    icon: Icons.ticket,
    bg: "bg-orange-100",
    text: "text-orange-600",
    bar: "bg-orange-500",
    label: "Tickets",
  },
  ENTERTAINMENT: {
    icon: Icons.entertainment,
    bg: "bg-violet-100",
    text: "text-violet-600",
    bar: "bg-violet-500",
    label: "Entertainment",
  },
  MEDICAL: {
    icon: Icons.medical,
    bg: "bg-red-100",
    text: "text-red-600",
    bar: "bg-red-500",
    label: "Medical",
  },
  OTHERS: {
    icon: Icons.other,
    bg: "bg-slate-100",
    text: "text-slate-500",
    bar: "bg-slate-400",
    label: "Others",
  },
};

export default function ExpensesPage() {
  const [expandedId, setExpandedId] = useState<string | null>("exp-001");
  const [editingExp, setEditingExp] = useState<ExpenseResponseDTO | null>(null);
  const [deletingExp, setDeletingExp] = useState<ExpenseResponseDTO | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = useGetMembers(id as string);
  const members = data?.data?.members;
  const { data: expenseData, isLoading: expensesLoading } = useGetExpenses(id as string);
  const deleteExp = useDeleteExpense()
  const expenses = expenseData?.data?.expenses;
  const anyModal = addModalOpen || !!editingExp || !!deletingExp;
  useEffect(() => {
    document.body.style.overflow = anyModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyModal]);

  function handleDelete() {
    if (!deletingExp) return;
    if (expandedId === deletingExp.id) setExpandedId(null);
    deleteExp.mutate({id:id as string,expenseId:deletingExp.id})
    setDeletingExp(null);
  }
  if (isLoading || expensesLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <>
      <div className="flex justify-end items-center mb-6">
        <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 bg-[#0f6e56] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:brightness-110 active:scale-95 transition-all">
          {Icons.plus} Add expense
        </button>
      </div>

      <div className="space-y-3">{expenses?.length === 0 ? <p className="text-sm text-[#bec9c3] text-center py-16">No expenses yet. Add one above!</p> : expenses.map((exp: ExpenseResponseDTO) => <ExpenseRow key={exp.id} expense={exp} expanded={expandedId === exp.id} onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)} onEdit={() => setEditingExp(exp)} onDelete={() => setDeletingExp(exp)} />)}</div>

      {addModalOpen && <ExpenseModal id={id as string} mode="add" onClose={() => setAddModalOpen(false)} members={members} />}
      {editingExp && <ExpenseModal id={id as string} mode="edit" initial={editingExp} onClose={() => setEditingExp(null)} members={members} />}
      {deletingExp && <DeleteConfirmModal title={deletingExp.title} onConfirm={handleDelete} onCancel={() => setDeletingExp(null)} />}
    </>
  );
}
