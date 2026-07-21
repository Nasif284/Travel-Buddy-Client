"use client";

import { useEffect, useState } from "react";
import { GetExpenseSummaryResponseDTO } from "../interface/interface";
import { useGetSummary } from "../hooks/hooks";
import { useParams } from "next/navigation";

const DUMMY_SUMMARY: GetExpenseSummaryResponseDTO = {
  totalExpenses: 42850,
  youPaid: 15400,
  youOwe: 1200,
  youAreOwed: 4250,
  netBalance: 3050,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

// ── Icons ─────────────────────────────────────────────────────────────────────
const WalletIcon = () => (
  <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24">
    <path d="M21 7H3c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 11H3V9h18v9zM1 5h20v2H1zM3 3h18v1H3z" />
    <circle cx="17" cy="13.5" r="1.5" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </svg>
);

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#e5e9e5] rounded-lg ${className ?? ""}`} />;
}

export default function ExpenseSummaryPage() {
  const { id } = useParams();
  const { data: summary, isLoading } = useGetSummary(id as string);
  const data = summary?.data
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    );
  }

  if (!data) return null;

  const isNetPositive = data.netBalance >= 0;

  return (
    <div className="space-y-6">
      {/* ── Total trip expenses ── */}
      <div className="bg-white p-8 rounded-2xl border border-[#e0e3e0]/50 shadow-sm flex flex-col items-center text-center">
        <p className="text-[10px] font-bold text-[#6f7a74] uppercase tracking-widest mb-3">Total Trip Expenses</p>
        <p className="text-5xl font-extrabold text-[#005440] tracking-tight">{fmt(data.totalExpenses)}</p>
        <p className="text-xs text-[#9ca8a3] mt-2">Bali Squad Trip · Jun 12 – Jun 28</p>
      </div>

      {/* ── Personal metrics grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* You Paid */}
        <div className="bg-white p-6 rounded-2xl border border-[#e0e3e0]/50 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#6f7a74] uppercase tracking-wider">You Paid</p>
            <span className="w-7 h-7 rounded-full bg-[#f0faf6] flex items-center justify-center text-[#005440]">
              <ArrowUpIcon />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-[#181d1a]">{fmt(data.youPaid)}</p>
          <p className="text-xs text-[#9ca8a3]">Total you have covered for the group</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e0e3e0]/50 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#6f7a74] uppercase tracking-wider">Your Expense</p>
            <span className="w-7 h-7 rounded-full bg-[#fff4f3] flex items-center justify-center text-[#ba1a1a]">
              <ArrowDownIcon />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-[#181d1a]">{fmt(data.yourShare)}</p>
          <p className="text-xs text-[#9ca8a3]">Total of your expense</p>
        </div>

        {/* You Owe */}
        <div className="bg-white p-6 rounded-2xl border border-[#ffdad6]/70 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#6f7a74] uppercase tracking-wider">You Owe</p>
            <span className="w-7 h-7 rounded-full bg-[#fff4f3] flex items-center justify-center text-[#ba1a1a]">
              <ArrowDownIcon />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-[#ba1a1a]">{fmt(data.youOwe)}</p>
          <p className="text-xs text-[#9ca8a3]">Pending to settle with buddies</p>
        </div>

        {/* You Are Owed */}
        <div className="bg-white p-6 rounded-2xl border border-[#c9eadb]/70 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#6f7a74] uppercase tracking-wider">You Are Owed</p>
            <span className="w-7 h-7 rounded-full bg-[#f0faf6] flex items-center justify-center text-[#005440]">
              <ArrowUpIcon />
            </span>
          </div>
          <p className="text-2xl font-extrabold text-[#005440]">{fmt(data.youAreOwed)}</p>
          <p className="text-xs text-[#9ca8a3]">Awaiting repayment from buddies</p>
        </div>
      </div>

      {/* ── Net balance banner ── */}
      <div className={`p-6 rounded-2xl shadow-md flex justify-between items-center ${isNetPositive ? "bg-[#0f6e56]" : "bg-[#ba1a1a]"}`}>
        <div>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">Net Balance</p>
          <p className="text-3xl font-extrabold text-white">
            {isNetPositive ? "+" : ""}
            {fmt(data.netBalance)}
          </p>
          <p className="text-xs text-white/60 mt-1">{isNetPositive ? "You're ahead — the group owes you more than you owe." : "You owe more than you're owed overall."}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-full">
          <WalletIcon />
        </div>
      </div>

      {/* ── Quick breakdown bar ── */}
      <div className="bg-white p-6 rounded-2xl border border-[#e0e3e0]/50 shadow-sm space-y-4">
        <p className="text-[10px] font-bold text-[#6f7a74] uppercase tracking-wider">Breakdown</p>
        <div className="space-y-3">
          {[
            { label: "You Paid", value: data.youPaid, total: data.totalExpenses, color: "bg-[#005440]" },
            { label: "Your Expense", value: data.yourShare, total: data.totalExpenses, color: "bg-[#005450]" },
            { label: "You Owe", value: data.youOwe, total: data.totalExpenses, color: "bg-[#ba1a1a]" },
            { label: "You Are Owed", value: data.youAreOwed, total: data.totalExpenses, color: "bg-[#0f6e56]/60" },
          ].map(({ label, value, total, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs font-medium text-[#3f4944] mb-1">
                <span>{label}</span>
                <span>
                  {fmt(value)} <span className="text-[#9ca8a3]">/ {fmt(total)}</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[#f1f4f1] overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${Math.min((value / total) * 100, 100).toFixed(1)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
