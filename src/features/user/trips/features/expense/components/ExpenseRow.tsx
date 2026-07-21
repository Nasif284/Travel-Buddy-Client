import { useState } from "react";
import { CategoryCode, ExpenseRowProps, SQUAD_MEMBERS } from "../interface/interface";
import { CATEGORY_CONFIG} from "../pages/ExpensePage";
import ExpenseMenu from "./ExpenseMenu";
const Icons = {
  dotsVertical: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  ),
  chevronRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  chevronUp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
};
const avatarById = Object.fromEntries(SQUAD_MEMBERS.map((m) => [m.id, m.avatar]));
function formatDate(d: Date): string {
   
  return new Date(d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function formatAmount(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function ExpenseRow({ expense, expanded, onToggle, onEdit, onDelete }: ExpenseRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const catCode = expense.category.code as CategoryCode;
  const cfg = CATEGORY_CONFIG[catCode] ?? CATEGORY_CONFIG.OTHERS;
  const splitLabel = expense.splitMethod.name;
  const isEqualSplit = expense.splitMethod.code === "EQUAL";
  const meParticipant = expense.participants.find((p) => p.memberId === "me");

  return (
    <div className={`bg-white rounded-2xl shadow-sm transition-shadow ${expanded ? "ring-1 ring-[#0f6e56]/15" : "hover:shadow-md"}`}>
      {/* Main row */}
      <div className="p-4 flex items-center gap-4">
        {/* Category icon */}
        <div className={`w-10 h-10 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center flex-shrink-0`}>{cfg.icon}</div>

        {/* Title + meta */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onToggle}>
          <h4 className="font-bold text-sm text-[#181d1a] truncate">{expense.title}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-[#3f4944]">{formatDate(expense.expenseDate)}</span>
            {!expanded && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#bec9c3]" />
                <div className="flex items-center gap-1.5 bg-[#f1f4f1] px-2 py-0.5 rounded-full">
                  {avatarById[expense.paidBy.id] && <img src={avatarById[expense.paidBy.id]} alt={expense.paidBy.name} className="w-3.5 h-3.5 rounded-full object-cover" />}
                  <span className="text-[9px] font-medium">Paid by {expense.paidBy.name}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="text-right flex-shrink-0 cursor-pointer" onClick={onToggle}>
          <p className="text-sm font-black text-[#181d1a]">{formatAmount(expense.amount)}</p>
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold mt-0.5
            ${isEqualSplit ? "bg-[#c9eadb] text-[#4d6b5f]" : "bg-[#e5e9e5] text-[#3f4944]"}`}
          >
            {splitLabel}
          </span>
        </div>

        {/* 3-dot */}
        <div className="relative flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            className="p-1 hover:bg-[#f1f4f1] rounded-full transition-colors text-[#3f4944]"
          >
            {Icons.dotsVertical}
          </button>
          {menuOpen && (
            <ExpenseMenu
              onEdit={() => {
                setMenuOpen(false);
                onEdit();
              }}
              onDelete={() => {
                setMenuOpen(false);
                onDelete();
              }}
              onClose={() => setMenuOpen(false)}
            />
          )}
        </div>

        {/* Expand chevron */}
        <button onClick={onToggle} className="text-[#3f4944] flex-shrink-0 hover:text-[#005440] transition-colors">
          {expanded ? Icons.chevronUp : Icons.chevronRight}
        </button>
      </div>

      {/* Expanded breakdown */}
      {expanded && (
        <div className="px-4 pb-4">
          <div className="bg-[#f1f4f1] rounded-xl p-4 grid grid-cols-4 gap-4">
            {/* Paid by col */}
            <div className="space-y-1">
              <p className="text-[10px] text-[#3f4944] font-medium">{expense.paidBy.name} paid</p>
              <p className="text-xs font-bold text-[#181d1a]">{formatAmount(expense.amount)}</p>
              {avatarById[expense.paidBy.id] && <img src={avatarById[expense.paidBy.id]} alt={expense.paidBy.name} className="w-7 h-7 rounded-full object-cover mt-1" />}
            </div>
            {/* Splits */}
            <div className="col-span-3 grid grid-cols-4 gap-2">
              {expense.participants.map((p) => {
                const isMe = p.memberId === "me";
                return (
                  <div key={p.memberId} className={`p-2 rounded-lg ${isMe ? "bg-white border-2 border-[#0f6e56]/20" : "bg-white/60"}`}>
                    <p className={`text-[9px] mb-0.5 ${isMe ? "text-[#005440]" : "text-[#3f4944]"}`}>{isMe ? "You owe" : `${p.name} owes`}</p>
                    <p className="text-[11px] font-bold text-[#181d1a]">{formatAmount(p.amount)}</p>
                    {expense.splitMethod.code === "PERCENTAGE" && p.percentage !== null && <p className="text-[9px] text-[#6f7a74]">{p.percentage}%</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
